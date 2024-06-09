import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface NoteCardProps {
  title: string;
  time: string;
}
const NoteCard = ({ title, time }: NoteCardProps) => {
  return (
    <TouchableOpacity style={styles.mainContainerCard}>
      <Text style={styles.cardTime}> {time}</Text>
      
      <Text style={styles.cardTitle}>{title}</Text>
      
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainerCard: {
    flexDirection:'column',
    alignItems:'stretch',
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    height: 100,
    padding: 10,
    
  },
  cardTime:{
    flex:1,
    textAlign:'right',
    fontWeight:'bold',
    fontSize:15,
    width:'100%',
    backgroundColor:'deepskyblue',
    padding:2,
    borderRadius:10,
    borderTopLeftRadius:60
        
  }, 
  cardTitle:{
    flex:3,
    textAlign:'left',
    fontSize:15, 
    width:'100%',
    backgroundColor:'#eee',
    padding:2,
    borderBottomLeftRadius:40
    
  }
});

export default NoteCard;
