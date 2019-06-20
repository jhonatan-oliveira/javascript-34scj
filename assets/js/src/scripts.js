//encapsulado
const posts = (function () {

    var url = "https://5d04064fd1471e00149bb174.mockapi.io/api/v1/blogs";

    return {
        sendSearch: function () {
            let searchTerm = document.querySelector("#searchTerm").value;

            fetch(url + "?search=Hand").then(response => response.json()).then(json => {
                let searchResult = document.querySelector("#searchResult");
                let result = json.map(item => {
                    return `<li>${item.title}</li>:`;
                })
                searchResult.innerHTML = result;
            })
            
            console.log("search foi acionada");
        },
        getPosts: function () {
            fetch(url).then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {
                        var blogWrapper = document.getElementById("demo");
                        var allPosts = data.map(item => {
                            var capitalLetter = item.title.charAt(0).toUpperCase();

                            var title = `<h2 class='blog-post-title'>${capitalLetter + item.title.slice(1)}</h2>`;
                            var body = `<p>${item.body}</p>`;

                            var meta = `<p>Post numero #${item.id}</p>`;

                            var blogPost = `<div class='blog-post'>${title + meta + '</hr/>' + body + body + body + body} </div>`;

                            return blogPost;
                        }).join();

                        blogWrapper.innerHTML = allPosts;

                    });
                }
            })
        }
    }
}());

const search = (function () {
    return {
        openSearch: function () {
            document.querySelector('#searchLink').addEventListener("click", () => {
                let form = document.querySelector("#searchBox > div");
                let input = document.querySelector("#searchBox > div > input");
                let submitSearch = document.querySelector("#submitSearch");

                form.style.display = "block";

                form.animate(
                    [
                        // keyframes
                        { transform: "translateX(15px)" },
                        { transform: "translateX(0px)" }
                    ],
                    {
                        // timing options
                        duration: 3000,
                        iterations: 1
                    }
                );

                input.focus();
                submitSearch.addEventListener("click", () => {
                    search.sendSearch();
                });

            });

        }
    }
}());


posts.getPosts();
posts.sendSearch();
search.openSearch();

//PARTE 1 AJAX
// function reqListener() {
//     console.log(this.responseText);
// }

// var oReq = new XMLHttpRequest();

// oReq.onload = reqListener;
// oReq.open("get", "https://5d04064fd1471e00149bb174.mockapi.io/api/v1/blogs", true);
// oReq.send();
