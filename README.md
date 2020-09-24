# vue-crash-course

Учебный проект на основании видео

[![Основное видео](http://img.youtube.com/vi/OlnwgS-gk8Y/0.jpg)](http://www.youtube.com/watch?v=OlnwgS-gk8Y "Основное видео")

## Создание нового проект Vue
### Устанавливаем `vue-cli`
    npm install -g @vue/cli
##### или
    yarn global add @vue/cli
    
### Создаем проект
    vue create my-project
##### или
    vue ui 
    
При создании проекта выбираем настраиваемую установку и оставляем только **babel**,
а на втором вопросе отказываемся от сохранения шаблона.

---

### Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

<br>
<br>

------------

<br>
<br>

# Пояснения

## Компоненты

1. Импортируются
    
```vue
import TodoList from '@/components/TodoList'
```
Знак **@** указывает на папку **src**

2. Регистрируются в скрипте, в разделе **components**

```vue
components: {
    TodoList,
},
```

3. Используются как и в React
```vue
    <TodoList />
```

## Стили

Стили помещаются в тег **style** в каждом компоненте. 

Чтоб создать уникальные стили добавляем атрибут **scoped** - это добавит специальный хеш-атрибут 
и стили будут задействованы только к этому компоненту

```vue
<style scoped>
	ul {
		margin: 0;
		padding: 0;
	}
</style>
```



## Данные

По сути это **props** в React

Для инициализации данных прописываем их в функцию **data()**

```vue
export default {
    name: 'App',
    data() {
        return {
            todos: []
        }
    },
}
```

Для передачи данных в компонент исопльзуем тег **v-bind**

```vue
<TodoList
        v-bind:name_param="todos"
/>
```
где
 - `name_param` - это название пропса в компоненте
 - `todos` - это сами данные 

В самом компоненте необходимо объявить получаемые пропсы в разделе **props** и в массиве указываем имя получаемых данных

```vue
<script>
    export default {
        props: ['name_param'],
    }
</script>
```

при получении можно также валидировать

```vue
<script>
    export default {
        props: { // при валидации  уже передаются через объект
            todo: {
                type: Object,
                required: true, // обязательный параметр
            },
            index : Number // можно сходу указать тип
        }
    }
</script>
```

## Коллекции

Если нам надо выввести коллекцию каких-то компонентов, то в самом компоненте, 
который надо выводить при вызове указываем атрибут **v-for**

```vue
<TodoItem
    v-for="(todo, i) of todos"
    v-bind:todo="todo"
    v-bind:index="i"
/>
``` 

в значении **v-for** указываем имя переменной передаваемого элемента `todo` и индекса `i` , 
которые мы передаем в виде **props** через **v-bind** уже с именами  `todo` и `index`


## События

### Подписаться

Подписаться на событие элемента можно через атрибут **v-on:** 
```vue
<TodoItem
    v-on:click="removeTodo"
/>
```
а дальше, после двоеточия, указываем название события и указываем обработчик.

Так же есть сокращенный тип привязки событий

```vue
<TodoItem
    @click="removeTodo"
/>
```

### Обработчик

Все обработчики регистрируем в разделе **methods**

```vue
<script>
    export default {        
        methods: {
            removeTodo(id) {
                this.$emit('remove-todo', id)
            }
        }
    }
</script>
``` 

### Свое событие

События создаются через объект `$emit` который можно вызвать через `this` в коде
```vue
this.$emit('remove-todo', todo.id)
```

или можно генерить непосредственно в темплейте

```vue
<button class="rm" v-on:click="$emit('remove-todo', todo.id)">&times;</button>
```
в обоих случаях, мы при клике зарегистрируем событие `remove-todo` в которое будет передана переменная `todo.id`


## Хуки

если что-то надо сделать до создания компонента то прописываем это в функцию `mounted`
```vue
export default {
    name: 'App',
    data() {
        return {
            todos: []
        }
    },
    mounted() {
        fetch('https://jsonplaceholder.typicode.com/todos?_limit=3')
            .then(response => response.json())
            .then(json => {
                this.todos = json
            })
    },
}
```

В данном случае мы получаем json и сохраняем его в массив `todos`


## Роутинг

Для роутинга необходима библиотека 
    
    npm i vue-router
    
Настройка роутов происходит тут

    src/router.js

В главном файле **main.js** импортим **router.js** и передаем его в главный компонент `Vue`

А в самом шаблоне главного элемента прописываем вызов компонента роутов
```vue
<router-view />
```

### Ссылки

Можно указывать роуты напрямую, но чтоб страница не перезагружалась генерим их через компонент `router-link`

```vue
<router-link to="/todos">Todos</router-link>
```

