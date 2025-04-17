import AppExpress from "@itznotabug/appexpress";
import ejs from "ejs";
const app = new AppExpress();

app.engine('ejs', ejs);
app.static('public');
app.views('views');
// make sure to add correct content-types.

app.get("/", (req, res) => {
    res.render("index")
})

// email veriifcation endpoint
app.get("/verify",async(req,res)=>{
    const {userId,secret}=req.query;
    console.log("userId",userId);
    console.log("secret",secret);

    try{
        const result = await updateVerification(userId, secret); // Wait for updateVerification function to complete
        console.log(result);
        res.render("template",{title:"✅ Verification Complete", message:"Your email address has been verified successfully.",});
    }
    catch(e){
        res.render("template",{title:"❌ Verification Failed", message:`⚠️ Reason : ${e.message}`,});
    }
})

// password reset endpoint
app.get("/recovery", (req, res) => {
    const {userId,secret}=req.query;
    console.log("userId",userId);
    console.log("secret",secret);
    res.render("reset_password",{userId,secret,message:""});
});

// complete password reset post endpoint
app.post("/reset_password", async (req, res) => {
    const { userId, secret, password, password_confirm } = req.body;

    if (password !== password_confirm) {
        res.render("reset_password",{userId,secret, message:"Passwords do not match."});
    }

    if (password.length < 8) {
        res.render("reset_password",{userId,secret, message:"Password must be at least 8 characters."});
    }

    try {
        const result = await  updateNewPassword(userId,secret,password,password_confirm); // Wait for updatePassword function to complete
        console.log(result);
        res.render("template",{title:"✅ Password Changed", message:"Your password was changed successfully.",});
    } catch (err) {
        res.render("template",{title:"❌ Password Reset Failed", message:`⚠️ Reason : ${err.message}`,});
    }
});

// 404 error page
app.get("*", (req, res) => {
    res.render("template",{title:"❌ Error", message:"⚠️ Page not found",});
});


export default async (context) => await app.attach(context);