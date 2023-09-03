import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Text from './text'
import { ob, Dir } from './ob'
import Ob from './ob'
import { time } from 'console'

const SCREEN_HEIGHT = window.innerHeight;
const SCREEN_WIDTH = window.innerWidth;
const T = .01;

//******************** Index Component Difinition ********************/
export default function Index() {
  const [obList, setObList] = useState<ob[]>([]);
  const [magList, setMagList] = useState<ob[]>([]);
  //******************** Initialize Object List States ********************/
  useEffect(() => {
    setObList((prevObList) => {
      const newObList = [...prevObList]
      newObList.push(new ob(500, 500));
      // newObList.push(new ob(400, 400));
      return newObList;
    });
    setMagList((prevObList) => {
      const newObList = [...prevObList]
      newObList.push(new ob(300, 300));
      return newObList;
    });
  }, []);




//******************** Move ********************/
  function move(){
    //******************** Iterate Objects, Update Velocity and Position ********************/
    setObList(prevObList => {
      const newObList = [...prevObList]
      for(let i=0; i<newObList.length; i++){
        const obj = newObList[i];
        let collision = false;
        //******************** Check and Handle Bound Collision ********************/
        collision = obj.bounds(Dir.y, T, SCREEN_HEIGHT)
          || obj.bounds(Dir.y, T, 0)
          || obj.bounds(Dir.x, T, SCREEN_WIDTH)
          || obj.bounds(Dir.x, T, 0);
        if(!collision)

          for(let j=0; j<newObList.length; j++){
            if(j != i){
              const obj_other = newObList[j];
              collision = obj.bounds(Dir.y, T, obj_other.y)
                || obj.bounds(Dir.x, T, obj_other.x);
              if(collision){
                break;
              }
            }
          }
        
          //******************** Otherwise Simply Move ********************/
          if(!collision){
            obj.move(T);
            obj.accl(T);
          }
        
      }
    return newObList;
    });
  }
  


    obList.map(ob => {
      magList.map(mag => {
        // ob.calcMag(mag);
        // ob.obCol(mag);
      });
    });

  //******************** Event Loop ********************/
  function tick(){
    // mag();

    move();

  }
  //******************** Start an interval to iterate an event frame once per 'T' period ********************/
  useEffect(() => {
    const interval = setInterval(tick, T*10000);
    return () => clearInterval(interval);
  }, []);


//******************** Index Component Rendering ********************/
  return (
    <div className="container">
      {/* {JSON.stringify(obList)} */}
      {obList.map(obj => {return (
        <Ob obj={obj}/>
      )}
      )}
      {/* {JSON.stringify(obList)} */}
      {magList.map(obj => {return (
        <Ob obj={obj}/>
      )}
      )}
      
    </div>
  )
}

ReactDOM.render(<Index/>, document.getElementById('root'))