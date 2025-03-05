interface Task {
	state: boolean;
	element: HTMLHeadElement;
}

interface Category {
	element: HTMLHeadElement;
	tasks: Array<Task>;
}

var categories: Array<Category> = [];
var currentCategory: string = "";

const categoryListContainer: HTMLDivElement = document.querySelector(".container .category-list-container") as HTMLDivElement;
const categoryNameInput: HTMLInputElement = document.getElementById("categoryNameInput") as HTMLInputElement;
const addCategoryButton: HTMLButtonElement = document.getElementById("addCategoryButton") as HTMLButtonElement;

const taskNameDisplay: HTMLDivElement = document.getElementById("taskNameDisplay") as HTMLDivElement;
const tasksContainer: HTMLDivElement = document.querySelector(".container .task-list-container .tasks-container") as HTMLDivElement;
const taskNameInput: HTMLInputElement = document.getElementById("taskNameInput") as HTMLInputElement;
const addTaskButton: HTMLButtonElement = document.getElementById("addTaskButton") as HTMLButtonElement;

function getCategoryIndexByName(name: string): number {
	return categories.findIndex((category) => category.element.textContent === name);
}

function getTaskIndexByName(category: Category, name: string): number {
	return category.tasks.findIndex((task) => task.element.textContent === name);
}

function addCategory(name: string): void {
	if (getCategoryIndexByName(name) !== -1) {
		return;
	}

	categories.push({
		element: document.createElement("h4"),
		tasks: []
	});

	const category: Category = categories.at(-1) as Category;
	const element: HTMLElement = category.element;

	element.textContent = name;
	element.addEventListener("click", () => {
		tasksContainer.innerHTML = '';

		category.tasks.forEach((task) => {
			tasksContainer.appendChild(task.element);
		});

		taskNameDisplay.textContent = name;
		currentCategory = name;
	});

	categoryListContainer.appendChild(element);
}

function addTaskToCategory(category: Category, name: string, state?: boolean): void {
	if (getTaskIndexByName(category, name) !== -1) {
		return;
	}

	category.tasks.push({
		state: (state) ? state : false,
		element: document.createElement("h4")
	});

	const element: HTMLHeadElement = category.tasks.at(-1)!.element;
	element.textContent = name;

	element.addEventListener("click", () => {
		element.remove();
		category.tasks.splice(getTaskIndexByName(category, name), 1);
	});

	tasksContainer.appendChild(element);
}

addCategoryButton.addEventListener("click", () => {
	if (categoryNameInput.value.trim() === "") {
		return;
	}

	addCategory(categoryNameInput.value);

	categoryNameInput.value = "";
});

addTaskButton.addEventListener("click", () => {
	if (taskNameInput.value === null) {
		return;
	}

	const categoryIndex: number = getCategoryIndexByName(currentCategory);

	if (categoryIndex < 0) {
		return;
	}

	addTaskToCategory(categories[categoryIndex], taskNameInput.value);

	taskNameInput.value = "";
});
