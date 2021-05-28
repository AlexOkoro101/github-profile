
const baseUrl = 'https://api.github.com/graphql';
const githubData = {
    "token": "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",
    "username": "AlexOkoro101"
}

fetch(baseUrl, {
    method: 'POST',
    headers: new Headers({
        Authorization: "bearer " + githubData["token"],
        "Content-Type":"application/json"
    }),
    body: JSON.stringify({
        query: `
          {
            repositoryOwner(login: "AlexOkoro101") {
              repositories(ownerAffiliations: OWNER, first: 10) {
                nodes {
                  name
                }
              }
            }
          }
        `
    })
})
.then(res => res.json())
.then(data => {
    console.log(data.data.repositoryOwner.repositories)
})
.catch(err => console.log(err.message))


const myFunction = () => {
  const mobileNav = document.getElementById('mobile-navigation');
  if(mobileNav.style.display === "none") {
    mobileNav.style.display = "block";
  } else {
    mobileNav.style.display = "none";
  }
  console.log("working")
}