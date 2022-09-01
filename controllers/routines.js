const Routine = require('../models/Routine')
const User = require('../models/User')
const {ensureAuth, ensureGuest} = require('../middleware/auth')


module.exports = {
    getRoutines: async (req,res)=>{
        try{
            const routineItems = await Routine.find({user: req.user.id}).lean()
            const itemsLeft = await Routine.countDocuments({user: req.user.id, completed: false})
            res.render('routines.ejs', {
                name: `${req.user.firstName} ${req.user.lastName}`,
                routines: routineItems, 
                left: itemsLeft
            })
        }catch(err){
            console.log(err)
        }
    },
    createRoutine: async (req, res)=>{
        try {   
            const routineItems = await Routine.find({user: req.user.id})
            const hasRoutine = await routineItems.some((routine) => routine.routine.toLowerCase() === req.body.routineItem.toLowerCase() && routine.user == req.user.id)
            if(hasRoutine){
                console.log(`${req.body.routineItem} already exists!`)
                res.redirect('/routines') 
            } else {
                // use this commented out block of code if you want to capatalize every first letter of strings with multiple words
                // const newRoutine = req.body.routineItem.split(' ').length > 1 
                // ? req.body.routineItem.split(' ').map((word) => word[0].toUpperCase() + word.substring(1)).join(' ') 
                // : req.body.routineItem[0].toUpperCase() + req.body.routineItem.substring(1)
                const newRoutine = req.body.routineItem[0].toUpperCase() + req.body.routineItem.substring(1) // only capatalizes first letter of first word
                const newDueDate = new Date(req.body.routineDueDate.replace(/-/g, '\/').replace(/T.+/, '')) // regex here fixes issue of date being converted to local time
                await Routine.create({routine: newRoutine, dueDate: newDueDate, user: req.user.id, completed: false})
                console.log(`"${newRoutine}" has been added to your routines with a due date of "${newDueDate}"!`)
                res.redirect('/routines') 
            }    
        } catch(err){
            console.log(err)
        }  
    },
    markComplete: async (req, res)=>{
        try{
            await Routine.findOneAndUpdate({_id:req.body.routineIdFromJSFile},{
                completed: true
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        }catch(err){
            console.log(err)
        }
    },
    markIncomplete: async (req, res)=>{
        try{
            await Routine.findOneAndUpdate({_id:req.body.routineIdFromJSFile},{
                completed: false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },
    deleteRoutine: async (req, res)=>{
        try{
            await Routine.findOneAndDelete({_id:req.body.routineIdFromJSFile})
            console.log('Deleted Routine')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}    