let posts=[];

fetch("assets/data/posts.json")
.then(res=>res.json())
.then(data=>{
posts=data;

if(document.getElementById("featured-post")) showFeatured();
if(document.getElementById("posts-container")) showPosts(posts);
if(document.getElementById("blog-container")) showBlog();
if(document.getElementById("single-post")) showSingle();
if(document.getElementById("breaking-text")) showBreaking();
});

function showFeatured(){
const post=posts[0];
document.getElementById("featured-post").innerHTML=`
<h2>${post.title}</h2>
<img src="${post.image}" style="width:100%;border-radius:8px;">
<p>${post.content.substring(0,150)}...</p>
<a href="single.html?id=${post.id}">Read More</a>
`;
}

function showPosts(data){
const container=document.getElementById("posts-container");
container.innerHTML="";
data.forEach(post=>{
container.innerHTML+=`
<div class="news-card">
<img src="${post.image}">
<h3>${post.title}</h3>
<p>${post.content.substring(0,100)}...</p>
<a href="single.html?id=${post.id}">Read More</a>
</div>`;
});
}

function showBlog(){
showPosts(posts);
}

function showSingle(){
const params=new URLSearchParams(window.location.search);
const id=params.get("id");
const post=posts.find(p=>p.id==id);
document.getElementById("single-post").innerHTML=`
<h1>${post.title}</h1>
<img src="${post.image}" style="width:100%;border-radius:8px;">
<p>${post.content}</p>
`;
}

function filterCategory(cat){
if(cat==="All"){showPosts(posts);}
else{
const filtered=posts.filter(p=>p.category===cat);
showPosts(filtered);
}
}

function showBreaking(){
document.getElementById("breaking-text").innerText=posts[0].title;
}
