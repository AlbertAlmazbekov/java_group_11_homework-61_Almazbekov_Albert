let formLogin = $('form')

$('form').on('submit', async e => {
    e.preventDefault()

    console.log(e.target)
    let data = new FormData(e.target)

    let country = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            image: 'images/java.jpg',
            description: data.get('d1')
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })


    let result = await country.json()
    console.log(result)

    let postNode = addPost(result);
    document.getElementsByClassName('container')[0].append(postNode);
    document.getElementsByClassName('form1')[0].addEventListener("submit", addListener)
})

function addPost(post) {
    let div = document.createElement('div')
    div.className = "post"
    div.innerHTML = `
    <div>id: ${post.id}</div>
    <img class="d-block w-100" src="${post.image}" alt="Post image">
    <div>${post.description}</div>
        <div class="comment">
                <button class="my-btn" type="button" data-bs-toggle="modal" data-bs-target="#myModal">
                <i class="bi bi-chat card-body-2"></i>
                </button>
        </div>
    </div>
    <div class="modal fade" id="myModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-body">
					<div class="container">
						<div class="form-block">
							<form class="form1">
								<div class="form-row">
									<label class="ibl" for="UserComment">Комметировать</label>
									<input type="comment" class="field" placeholder="Ваш comment" name="comment1"
										id="UserComment">
								</div>
								<button type="submit">Отправить</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
    `
    return div;
}

let getImage = async (imageId) => {
    return await fetch.get(baseUrl+'/image/'+imageId)
}

const baseUrl = 'https://jsonplaceholder.typicode.com/posts'


let getComment = async (commentId) => {
    return await fetch.get(baseUrlComment+'/comment/'+commentId)
}

const baseUrlComment = 'https://jsonplaceholder.typicode.com/posts/1/comments'

async function addListener(e) {
    // $('form1').on('submit', async e => {
        e.preventDefault()

        console.log(e.target)
        let data = new FormData(e.target)

        let country = await fetch('https://jsonplaceholder.typicode.com/posts/1/comments', {
            method: 'POST',
            body: JSON.stringify({
                comment: data.get('comment1')
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })


        let result1 = await country.json()
        console.log(result1)

        let postNode = addComment(result1);
        document.getElementsByClassName('my-btn')[0].append(postNode);

    // })
    $('#myModal').modal('toggle');
}

function addComment(comment) {
    let div = document.createElement('div')
    div.className = "com"
    div.innerHTML = `
    <div>id: ${comment.id}</div>
    <div>${comment.comment}</div>
    `
    return div;
}

