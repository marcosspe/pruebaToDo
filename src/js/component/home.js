import React, { useState, useEffect } from "react";
import { types } from "sass";

//create your first component
export function Home() {
	const [todoList, setTodoList] = useState([]);

	useEffect(() => {
		getData();
	}, []);

	const handleKeyPress = e => {
		if (e.target.value !== "" && e.charCode === 13) {
			let newTodo = {
				label: e.target.value,
				done: false
			};
			let newTodoList = [...todoList, newTodo];
			setTodoList(newTodoList);
			updateData(newTodoList);
			e.target.value = "";
		}
	};
	const getData = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/marcosspe")
			.then(resp => resp.json())
			.then(data => setTodoList(data))
			.catch(error => console.log(error));
	};

	const updateData = updatedList => {
		let updatedListToSend = JSON.stringify(updatedList);
		let options = {
			method: "PUT",
			body: updatedListToSend,
			headers: {
				"content-type": "application/json"
			}
		};

		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/marcosspe",
			options
		)
			.then(resp => resp.json())
			.then(data => console.log(data))
			.catch(error => console.log(error));
	};

	return (
		<div className="container-fluid">
			<div className="row d-flex justify-content-center">
				<div className="col-12 col-md-6 col-xl-4">
					<div className="card mt-5" style={{ width: "100%" }}>
						<input
							onKeyPress={handleKeyPress}
							placeholder="Agregar Tarea"
						/>
						<ul className="list-group list-group-flush">
							{todoList.length === 0 ? (
								<li className="list-group-item">
									Cargando...{" "}
								</li>
							) : (
								todoList.map((todo, index) => (
									<li key={index} className="list-group-item">
										{todo.label}
									</li>
								))
							)}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}
