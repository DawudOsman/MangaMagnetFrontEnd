import React, {Component} from 'react';
import { Link } from 'react-router-dom';
class App extends Component 
{
    render() 
    {
        return                 <div>
                <h1>Hello World!</h1>
                <Link to="/about">about</Link>
                                        </div>
        ;
    }
}
export default App;