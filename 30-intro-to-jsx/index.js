console.log('working!')

const Title = (props) => {
  return React.createElement('h1', {key: props.key}, props.text)
}

const Article = props =>
  React.createElement('div', { className: 'article', id: 'article-1', style: { color: 'blue', fontFamily: 'helvetica' }}, [
    React.createElement('h3', { className: 'article-title' }, props.title),
    React.createElement('img', { src: props.imageUrl, className: 'article-image' }),
    React.createElement('p', { className: 'article-content' }, props.content)
  ])

// const Navbar = props =>
//   React.createElement('div', { className: `ui inverted ${props.color} menu` },
//     React.createElement('a', { className: 'item' },
//       React.createElement('h2', { className: 'ui header' }, [
//         React.createElement('i', { className: `${props.icon} icon` }),
//         React.createElement('div', { className: 'content' }, props.title),
//         React.createElement('div', { className: 'sub header' }, props.subtitle)
//       ])
//     )
//   )

/* A Study in Navbar Orange */

// <div class='ui inverted orange menu'>
//   <a class='item'>
//     <h2 class='ui header'>
//       <i class='paw icon' />
//       <div class='content'>
//         Title
//       </div>
//       <div class='sub header'>
//         Subtitle
//       </div>
//     </h2>
//   </a>
// </div>

const Navbar = props =>
  <div className={`ui inverted ${props.color} menu`}>
    <a className='item'>
      <h2 className='ui header'>
        <i className={`${props.icon} icon`} />
        <div className='content'>
          {props.title}
        </div>
        <div className='sub header'>
          {props.subtitle}
        </div>
      </h2>
    </a>
  </div>

const App = () =>
  React.createElement('div', { id: 'app' }, [
    // Navbar({ title: 'Shinu', subtitle: `Gotta catch 'em all`, color: 'pink', icon: 'github alternate' }),
    <Navbar title='Something' icon='git' subtitle='lalala' color='green' />,
    Title({text: 'Welcome to React!', key: 'title-1'}),
    Article({ title: "Learn React the Right Way!", imageUrl: "http://www.ohmagif.com/wp-content/uploads/2012/09/smart-dog.gif", content: "Just kidding. Shiba Inus are great!"})
  ])

ReactDOM.render(
  // App(),
  <App />,
  document.querySelector('#root')
)
