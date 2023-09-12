import React from 'react';
import { Text, SafeAreaView, ScrollView, Platform, RefreshControl, StyleSheet } from 'react-native';
import Lottie from 'lottie-react-native'
import { ThreadsContext } from '../../context/thread-context';
import ThreadsItem from '../../components/ThreadsItem';

export default function TabOneScreen() {
  const [showAnimation, setShowAnimation] = React.useState<boolean>(false)
  const animationRef = React.useRef<Lottie>(null)
  const threads = React.useContext(ThreadsContext)

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 10,
          paddingTop: Platform.select({ android: 30, ios: 30 })
        }}
        refreshControl={
          <RefreshControl 
            refreshing={false} 
            onRefresh={() => {
              setShowAnimation(true)
              animationRef.current?.play()
            }}
            tintColor='transparent'
          />
        }
      >
        {showAnimation ? <Lottie
          ref={animationRef}
          source={require('../../lottie-animations/threads.json')}
          loop={false}
          autoPlay
          style={{ width: 350, height: 90, alignSelf: 'center' }}
          onAnimationFinish={() => {
            // alert('finished loading!')
            setShowAnimation(false)
          }}
        /> : null}
        {threads?.map(thread => (
          <ThreadsItem  key={thread?.id} {...thread} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}


