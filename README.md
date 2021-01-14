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

------------


# Пояснения

## <a name="top">Оглавление</a>
 
1. Основы
   - [Компоненты](#components);
   - [Стили](#style);
  
2. Работа с данными
   - [Данные](#data);
   - [Модели (Связь данных с компонентом)](#models);
   - [Вычисляемые поля](#computed_fields);

3. Конструкции
   - [Условия отображения](#block_if);
   - [Коллекции (for)](#block_for);

4. Поведение
   - [События](#event);
   - [Жизненный цикл](#lifecycle);
   - [Хуки](#action);

5. Роутинг
   - [Роутинг](#router). 
 

## Компоненты
<a name="components" href="#top">Оглавление</a>

1. Импортируются
    
```vue
import TodoList from '@/components/TodoList'
```
Знак **@** указывает на папку **src**

2. Регистрируются в скрипте, в свойстве **components**

```vue
<script>
    export default {
        components: {
            TodoList,
        }
    }
</script>
```

3. Используются как и в React
```vue
<TodoList />
```

## Стили
<a name="style" href="#top">Оглавление</a>

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

Так же доступно использование препроцессоров:

1. Необходимо установить библиотеку

        npm i -D sass-loader sass

2. И прописать в теге **style** атрибут  **lang="scss"**

```vue
<style lang="scss">
$color: red;
</style>
```




Подробней [тут](https://cli.vuejs.org/ru/guide/css.html#%D0%BF%D1%80%D0%B5-%D0%BF%D1%80%D0%BE%D1%86%D0%B5%D1%81%D1%81%D0%BE%D1%80%D1%8B)  


## Данные
<a name="data" href="#top">Оглавление</a>

По сути это **props** в React

Для инициализации данных прописываем их в функцию **data()**

```js
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
<TodoList v-bind:name_param="todos" />
```
где
 - `name_param` - это название пропса в компоненте
 - `todos` - это сами данные 

В самом компоненте необходимо объявить получаемые пропсы в свойстве **props** и в массиве указываем имя получаемых данных

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


## Модели (Связь данных с компонентом) 
<a name="models" href="#top">Оглавление</a>

Осуществляется через атрибут `v-model` , куда передаем переменную для связи

```vue
<input type="text" v-model="title"/>
```

связав данные с элементом мы можем их обработать в свойстве `watch`,
где нам надо создать функцию с таким же названием как и переменная, в данном случае `title()` 
и одним аргументом, куда будет попадать значение после изменений

```js
export default {
    data() {
        return {
            title: '',
        }
    },
    watch: {
        title(value) { 
            // ...
        }
    },
}
```

## Вычисляемые поля 
<a name="computed_fields" href="#top">Оглавление</a>

Если нам надо создать вычисляемую переменную то в свойстве `computed` описываем функцию которая будет возвращать результат

```js
export default {
    data() {
        return {
            todos: [],
        }
    },
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
}
```

а в самом темплейте используем название функции как переменную
```vue
<TodoList v-bind:todos="filterTodos" />
```


## <a name="block_if">Условия отображения (v-if)</a>
<a href="#top">Оглавление</a>

Для отображения определенного вывода в темплейте используются атрибуты `v-if`, `v-else-if` и `v-else`.
В первые два передаем условие для отображения. Конструкция работает на весь компонент и вложенных условий не предполагает 

```vue
<Loader v-if="loading" />
<TodoList v-else-if="todos.length" />
<p v-else>No todo!</p>
```


## <a name="block_for">Коллекции (v-for)</a>
<a href="#top">Оглавление</a> || 
<a name="block_for" href="https://ru.vuejs.org/v2/guide/list.html">Документация по **v-for**</a> 

Если нам надо вывести коллекцию каких-то компонентов, то в самом компоненте, 
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
<a name="event" href="#top">Оглавление</a>

### Подписаться

Подписаться на событие элемента можно через атрибут **v-on:** 
```vue
<TodoItem v-on:click="removeTodo" />
```
а дальше, после двоеточия, указываем название события и указываем обработчик.

Так же есть сокращенный тип привязки событий

```vue
<TodoItem @click="removeTodo" />
```

Можно запретить всплывающее событие через модификатор `prevent`
```vue
<form @submit.prevent="onSubmit">
    // ...
</form>
```

### Обработчик

Все обработчики регистрируем в свойстве **methods**

```js
export default {        
    methods: {
        removeTodo(id) {
    	    this.$emit('remove-todo', id)
        }
    }
}
``` 

### Свое событие

События создаются через объект `$emit` который можно вызвать через `this` в коде
```js
this.$emit('remove-todo', todo.id)
```

или можно генерить непосредственно в темплейте

```vue
<button class="rm" v-on:click="$emit('remove-todo', todo.id)">&times;</button>
```
в обоих случаях, мы при клике зарегистрируем событие `remove-todo` в которое будет передана переменная `todo.id`

## Жизненный цикл
<a name="lifecycle" href="#top">Оглавление</a>

[Жизненный цикл](https://ru.vuejs.org/images/lifecycle.png)


## Хуки
<a name="action" href="#top">Оглавление</a>

если что-то надо сделать до создания компонента - прописываем это в функцию `mounted`
```js
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
<a name="router" href="#top">Оглавление</a>

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

Можно указывать ссылки на страницу напрямую, 
но чтоб страница не перезагружалась генерим их через компонент `router-link`

```vue
<router-link to="/todos">Todos</router-link>
```

