import './App.css'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { packageStore } from './stores/packageStore'
import PackagesList from './components/packagesList'
import React from 'react'
import ParentSearch from './components/ParentSearch'


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
      <ParentSearch />
      <PackagesList />
    </div>
  )
})

export default App
