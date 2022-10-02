import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css'
import reportWebVitals from './reportWebVitals';


class TodoList extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      content: '',
      left: 0,
      display: 'all'  // 'all', 'act', 'cmp'
    }
    this.items = [];
    this.done = 0;
    this.removed = 0;

    this.handle_input_enter = this.handle_input_enter.bind(this);
    this.handle_input_update = this.handle_input_update.bind(this);
    this.handle_check = this.handle_check.bind(this);
    this.handle_remove = this.handle_remove.bind(this);

    this.list_display = this.list_display.bind(this);
    this.display_all = this.display_all.bind(this);
    this.display_act = this.display_act.bind(this);
    this.display_cmp = this.display_cmp.bind(this);
  }

  list_display(index){

    if(this.items[index][1] === 0){   // active
      return((this.state.display === 'cmp' ? "todo-app__item display_none" : "todo-app__item"));

    }else{                            // completed
      return((this.state.display === 'act' ? "todo-app__item display_none" : "todo-app__item"));
    }
  }

  display_all(event){
    // alert('display all!');
    this.setState({display: 'all'});
  }
  display_act(event){
    // alert('display active');
    this.setState({display: 'act'});
  }
  display_cmp(event){
    // alert('display completed');
    this.setState({display: 'cmp'});
  }

  handle_input_enter(event){
    if(event.keyCode === 13){
      // 0 is undone; 1 is done
      this.items.push([this.state.content,0]);
      this.setState({content: ''});
      this.setState({left: this.items.length - this.done - this.removed});
    }
  }

  handle_input_update(event){
    this.setState({content: event.target.value})
  }

  handle_check(event){
    let id = event.target.id;
    let element = document.getElementById(id);
    // unchecked > checked
    if(this.items[id][1] === 0){   
      this.done += 1;
      this.items[id][1] = 1;
      element.parentNode.nextElementSibling.classList.add("crossed");

    // checked > unchecked
    }else{                     
      this.done -= 1;
      this.items[id][1] = 0;
      element.parentNode.nextElementSibling.classList.remove("crossed");
    }
    this.setState({left: this.items.length - this.done - this.removed});
  }

  handle_remove(event){
    let id = event.target.id;
    let int = id.toString()[1];
    if(this.items[int][1] === 1){
      this.done -= 1;
    }
    let element = document.getElementById(id);
    element.parentNode.remove();
    this.removed += 1;
    this.setState({left: this.items.length - this.done - this.removed});
  }

  render(){
    const input_box = (
      <input class="todo-app__input" id="todo-list"
      placeholder="What needs to be done?" 
      value={this.state.content}
      onKeyDown={this.handle_input_enter}
      onChange={this.handle_input_update}></input>
    )

    const list_content = this.items.map((item, index) => 
      <li class={this.list_display(index)}>
        <div class="todo-app__checkbox">
          <input type="checkbox" id={index} onClick={this.handle_check}></input>
          <label for={index}></label>
        </div>
        <h1 class="todo-app__item-detail">{item[0]}</h1>
        <img src={require('./x.png')} class="todo-app__item-x" 
        alt="" onClick={this.handle_remove} id={"0"+index}></img>
      </li>
    );

    const list = (
      <ul class="todo-app__list" id="todo-list">{list_content}</ul>
    )

    const cc_button = (
      <button>Clear completed</button>
    )

    const footer = (
      <footer class="todo-app__footer" id="todo-footer">
        <div class="todo-app__total">{this.state.left} left</div>
        <ul class="todo-app__view-buttons">
          <button onClick={this.display_all}>All</button>
          <button onClick={this.display_act}>Active</button>
          <button onClick={this.display_cmp}>Completed</button>
        </ul>
        <div class="todo-app__clean">
          {(this.done === 0) ? null : cc_button}
        </div>
      </footer>
    )

    return(
      <div id="root" class="todo-app__root">
        <header class="todo-app__header">
          <div class="todo-app__title">todos</div>
        </header>
        <section class="todo-app__main">
          {input_box}
          {((this.items.length - this.removed) === 0) ? null : list}
        </section>
        {((this.items.length - this.removed) === 0) ? null : footer}
      </div>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <TodoList />
);

reportWebVitals();
