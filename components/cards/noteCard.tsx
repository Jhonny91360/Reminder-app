import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface NoteCardProps {
  title: string;
  time: string;
}
const NoteCard = ({ title, time }: NoteCardProps) => {
  return (
    <TouchableOpacity style={styles.mainContainerCard}>
      <Text>{title}</Text>
      <Text>{time}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainerCard: {
    backgroundColor: "gainsboro",
    borderWidth: 2,
    borderColor: "gray",
    borderRadius: 20,
    height: 100,
    padding: 10,
  },
});

export default NoteCard;
