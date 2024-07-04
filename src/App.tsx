import './App.css'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { packageStore } from './stores/packageStore'
import Bar from './components/Bar'
import PackagesList from './components/packagesList'
import React from 'react'


const App: React.FC = observer(() => {
  useEffect(() => {
    fetch('https://run.mocky.io/v3/6e4f48f3-16bc-48a9-ba76-773c1c670c25').
      then(response => response.json()).
      then(data => {
        packageStore.setPackages(data);
      })
  }, [])
  return (
    <div>
      <Bar />
      <PackagesList />
    </div>
  )
})

export default App
