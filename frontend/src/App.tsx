import {useEffect, useMemo, useRef, useState} from 'react'
import styles from './styles.module.css'
import * as ethereum from '@/lib/ethereum'
import * as main from '@/lib/main'

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
    // console.log(contract_)
  }, [])

  // Create a collection with 5 cards
  // const collectionName = 'MyCollection'
  // const cardCount = 5
  // await contract_.createCollection(collectionName, cardCount)
  //
  // Add one more card to the collection
  // const collectionId = 0; // Assuming this is the ID of the created collection
  // const imgUrl = 'https://onepiece-cardgame.dev/images/cards/OP01-001_332dbe_jp.jpg'
  // await contract_.mintCardToCollection(collectionId, imgUrl)

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
  wallet?.getCollections().then((collections) => {
    console.log('Collections:', collections);
  })


  return (
    <div className={styles.body}>
      <h1>Welcome to Pokémon TCG</h1>
    </div>
  )
}
