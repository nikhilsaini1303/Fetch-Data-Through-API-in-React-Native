import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  Image,
  View,
} from 'react-native';





function App() {

  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  

  const fetchData = async () => {
    
      const resp = await fetch("https://api.sampleapis.com/coffee/hot");
      const data = await resp.json();
      setData(data);
      setLoading(false);
    
  }

  
  useEffect(() => {
    fetchData();
  },[]);

  return (
    <View style={styles.viewContainer}>
      <Text style={styles.coffText}>Coffee Details</Text>
    {isLoading ? (
      <ActivityIndicator />
    ) : (
      <ScrollView>
        {
          
            data.length ? data.map((item, idx) => 
            <View key={idx}>
              <Text style={styles.titleText}>{idx + 1}. {item.title}</Text>
              <Text style={styles.desText}>
                <Text style={styles.desCon}>Description : </Text> 
                  {item.description}
              </Text>
              <Text style={styles.desText}>
                <Text style={styles.desCon}>Ingredients : </Text> 
                {item.ingredients.map((it, i) => 
                    
                      i === item.ingredients.length - 1 ? 
                        <Text key={i}>{it}. </Text> : 
                        <Text key={i}>{it}, </Text>
                      
                    
                )}
              </Text>
              <View style={styles.imgView}>
              {
                item.image !== "Image-path" ? 
                    <Image 
                    style={styles.imageCon}
                    source={{uri: item.image}}
                    /> 
                      : 
                    <Image 
                      style={styles.imageCon} 
                      source={require('./assets/default.png')}
                    />
              }
              </View>
            </View> ) : null
        }
      </ScrollView>
    )
      
    }
  </View>
  );
}

const styles = StyleSheet.create({
  viewContainer : {
    flex: 1,
    padding: 24
  },
  coffText : {
    textAlign: 'center',
    color : '#450902',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10 
  },
  titleText : {
    color : '#450902',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5
  },
  desText : {
    color : '#000',
    fontSize: 15,
    marginBottom: 5
  },
  desCon : {
    fontSize: 17
  },
  imageCon : {
    width: 200, 
    height: 200,
    margin: 20,
  },
  imgView : {
    alignItems: 'center'
  }

});

export default App;
