const username = document.getElementById("username");
const password = document.getElementById("password");
const form=document.getElementById('signin-form')

form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const usr=username.value.trim();
      const pass=password.value.trim();
      if(usr==='' || pass==='')
        return;
      const res = await fetch("http://localhost:5000/api/users/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name:usr, password:pass }),
      });

      const data=await res.json();
      
      if (res.ok) {
    // Redirect to index.html with userId in query
    window.location.href = `./index.html`;
  } else {
    alert(data.message || "Login failed");
  }
    });