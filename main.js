function handleSubmit () {
  const username = document.getElementById('username').value;

  sessionStorage.setItem("USERNAME", username);
  // window.location.href = "profile.html"

  // return;
}

const myFunction = () => {
  const mobileNav = document.getElementById('mobile-navigation');
  if(mobileNav.style.display === "none") {
    mobileNav.style.display = "block";
  } else {
    mobileNav.style.display = "none";
  }
  console.log("working")
}