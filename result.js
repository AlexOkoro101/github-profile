//API key
import LOWKEY from './apikey.mjs';

//DOM Elements
const displayPicture = document.getElementById('dp');
const  navImg = document.getElementById('nav-img');
const fullName = document.getElementById('fullname');
const gitUsername = document.getElementById('github-username');
const userBio = document.getElementById('bio-text');
const email = document.getElementById('email');
const totalCount = document.getElementById('count');
// const repoName = document.getElementById('repo-name');
const language = document.getElementById('language');
const repoLanguageColor = document.getElementById('repo-language-color');
const star = document.getElementById('star-rating');
const fokrNumber = document.getElementById('fork-number');
const updated = document.getElementById('updated');
const repoDetail = document.getElementById('repo-detail');



// Base URL
const baseUrl = 'https://api.github.com/graphql';



//Fetching data

window.addEventListener('load', () => {
    const username = sessionStorage.getItem("USERNAME");
    console.log(username)
    

    document.getElementById('github-username').innerHTML = username;
    fetch(baseUrl, {
        method: 'POST',
        headers: new Headers({
            Authorization: "bearer " + LOWKEY,
            "Content-Type":"application/json"
        }),
        body: JSON.stringify({
            query: `
            query($theUsername: String!) {
                user(login: $theUsername) {
                    email
                    bio
                    avatarUrl
                    name
                    repositories(first: 20, orderBy: {field: CREATED_AT, direction: ASC}, privacy: PUBLIC) {
                    totalCount
                        nodes {
                            description
                            forkCount
                            name
                            primaryLanguage {
                            color
                            name
                            }
                            updatedAt
                            stargazers {
                                totalCount
                            }
                        }
                    }
                }
            }
            `, variables: {theUsername: username}
        })
    })
    .then(res => {
    return res.json()
    // console.log(res.json())
    })
    .then(data => {
        console.log(data.data.user)
        const githubUser = data.data.user
        const fetchedRepos = data.data.user.repositories.nodes

        
        fullName.innerHTML = githubUser.name;
        userBio.innerHTML = githubUser.bio;
        email.innerHTML = githubUser.email;
        totalCount.innerHTML = githubUser.repositories.totalCount;
        displayPicture.setAttribute("src", githubUser.avatarUrl);
        navImg.setAttribute("src", githubUser.avatarUrl);


        fetchedRepos.forEach(repo => {
            // const repoName = document.createElement('p')
            // repoName.setAttribute("id", "repo-name")
            // repoName.innerHTML = repo.name
            // repoDetail.append(repoName)

            

           
            // language.setAttribute("id", "language")
            /* container.innerHTML = (`<i id="repo-language-color" style="background: ${repo.primaryLanguage.color}"></i> 
                                        ${repo.primaryLanguage.name} 
                                        <span><i class="far fa-star"> ${repo.stargazers.totalCount} </i></span> 
                                        <span><i class="fas fa-code-branch"></i> ${repo.forkCount}</span> 
                                        <span id="updated">Updated ${repo.updatedAt}</span>`) */

            const container = document.createElement('div')
            container.setAttribute("class", "repo-display");
            const repoContainer = document.getElementById('repo-container')                            
            container.innerHTML = (`
                                <div class="repo-detail" id="repo-detail">
                                    <p id="repo-name">${repo.name}</p>
                                    <p id="language">
                                        <i id="repo-language-color" style="background: ${repo.primaryLanguage.color}"></i>
                                        ${repo.primaryLanguage.name} 
                                        <span><i class="far fa-star"> ${repo.stargazers.totalCount} </i></span>
                                        <span><i class="fas fa-code-branch"></i> ${repo.forkCount}</span> 
                                        <span id="updated">Updated  ${repo.updatedAt}</span>
                                    </p>
                                </div>
                                <div class="rating">
                                    <button><i class="far fa-star"></i> Star</button>
                                </div>
                            `)
            repoContainer.append(container)




        });
    })
    .catch(err => console.log(err.message))
})

