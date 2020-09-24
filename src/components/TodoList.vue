<template>
	<div>
		<ul>
			<TodoItem/>
		</ul>
	</div>
</template>

<script>
    import TodoItem from '@/components/TodoItem'

    export default {
        components: {
            TodoItem
        }
    }
</script>