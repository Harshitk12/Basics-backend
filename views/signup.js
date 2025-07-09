const form=document.getElementById('signup-form');
const userName=document.getElementById('username');
const password=document.getElementById('password');

const API_URL = "http://localhost:5000/api/users/signup";

form.addEventListener('submit', async (e)=>{
    e.preventDefault()
    const usr=userName.value.trim();
    const pass=password.value.trim();
    if(usr==='' || password==='')
        return;
    try{
        const res=await fetch(API_URL,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({name:usr, password:pass})
        })
        const data=await res.json();
        if(res.ok)
          window.location.href='./land.html';
        else
          alert(data.message|| 'signup failed');
          
    }
    catch (err) {
    console.error("Error signing up", err);
  }
})