<template>
	<div>
		<h2>Todo app</h2>

		<router-link to="/">Home</router-link>
		<AddTodo
				@add-todo="addTodo"
		/>
		<select v-model="filter">
			<option value="all">All</option>
			<option value="completed">Completed</option>
			<option value="not-completed">Not Completed</option>
		</select>
		<hr/>
		<Loader v-if="loading"/>
		<TodoList
				v-else-if="filterTodos.length"
				v-bind:todos="filterTodos"
				@remove-todo="removeTodo"
		/>

		<p v-else>No todo!</p>
	</div>
</template>


<script>
    import TodoList from '@/components/TodoList'
    import AddTodo from '@/components/AddTodo'
    import Loader from '@/components/Loader'

    export default {
        name: 'App',
        data() {
            return {
                todos: [],
                loading: true,
                filter: 'all',
            }
        },
        mounted() {
            fetch('https://jsonplaceholder.typicode.com/todos?_limit=3')
                .then(response => response.json())
                .then(json => {
                    setTimeout(() => {
                        this.todos = json
                        this.loading = false
                    }, 500)
                })
        },
        components: {
            TodoList,
            AddTodo,
            Loader,
        },
        // watch: {
        //     filter(value) {
        //     }
        // },
        computed: {
            filterTodos() { // используем как переменную вместо массива todos
                if (this.filter === 'all') {
                    return this.todos
                }
                if (this.filter === 'completed') {
                    return this.todos.filter(t => t.completed)
                }
                if (this.filter === 'not-completed') {
                    return this.todos.filter(t => !t.completed)
                }
            }
        },
        methods: {
            removeTodo(id) {
                this.todos = this.todos.filter(t => t.id !== id)
            },

            addTodo(todo) {
                this.todos.push(todo)
            }
        }
    }
</script>
