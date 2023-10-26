import {useEffect, useMemo, useRef, useState} from 'react'
import styles from './styles.module.css'
import * as ethereum from '@/lib/ethereum'
import * as main from '@/lib/main'
import Collections from './components/Collections';

type Canceler = () => void
const useAffect = (
  asyncEffect: () => Promise<Canceler | void>,
  dependencies: any[] = []
) => {
  const cancelerRef = useRef<Canceler | void>()
  useEffect(() => {
    asyncEffect()
      .then(canceler => (cancelerRef.current = canceler))
      .catch(error => console.warn('Uncatched error', error))
    return () => {
      if (cancelerRef.current) {
        cancelerRef.current()
        cancelerRef.current = undefined
      }
    }
  }, dependencies)
}

const useWallet = () => {
  const [details, setDetails] = useState<ethereum.Details>()
  const [contract, setContract] = useState<main.Main>()
  useAffect(async () => {
    const details_ = await ethereum.connect('metamask')
    if (!details_) return
    setDetails(details_)
    const contract_ = await main.init(details_)
    if (!contract_) return
    setContract(contract_)
  }, [])

  const getCollections = async () => {
    if (!contract) return
    return await contract.getAllCollectionsAndCards()
  };

  return useMemo(() => {
    if (!details || !contract) return
    return { details, contract, getCollections }
  }, [details, contract, getCollections])
}

export const App = () => {
  const wallet = useWallet()

  return (
    <div className={styles.body}>
      <Collections />
    </div>
  )
}
