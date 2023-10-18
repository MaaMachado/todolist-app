import React, { useState} from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, Button } from 'react-native';


export default function TodoApp() {
  const [tarefas, setTarefas] = useState<{ texto: string; concluida: boolean }[]>(
    []
  );
  const [novaTarefa, setNovaTarefa] = useState('');

  const adicionarTarefa = () => {
    if (novaTarefa.trim() !== '') {
      setTarefas([...tarefas, { texto: novaTarefa, concluida: false }]);
      setNovaTarefa('');
    }
  };

  const marcarConcluida = (index: number) => {
    const novasTarefas = [...tarefas];
    novasTarefas[index].concluida = !novasTarefas[index].concluida;
    setTarefas(novasTarefas);
  };

  const excluirTarefa = (index: number) => {
    const novasTarefas = [...tarefas];
    novasTarefas.splice(index, 1);
    setTarefas(novasTarefas);
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>To-Do List</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite uma nova tarefa..."
          value={novaTarefa}
          onChangeText={(text) => setNovaTarefa(text)}
        />
        <TouchableOpacity onPress={adicionarTarefa}>
            <Text style={styles.addButton}>▶</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={tarefas}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.taskContainer}>
            <View style={styles.bola}></View>

            <Text
              style={{
                ...styles.task,
                textDecorationLine: item.concluida ? 'line-through' : 'none',
              }}
            >
              {item.texto}
            </Text>

            <View style={styles.btnSpace}>
              <TouchableOpacity onPress={() => marcarConcluida(index)}>
                <Text style={styles.buttonText}>{item.concluida ? '🔁' : '✅'}</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => excluirTarefa(index)}>
                <Text style={styles.buttonText}>❌</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 50,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 8,
  },
  addButton: {
    backgroundColor: '#2088AF',
    padding: 10.3,
    fontWeight: 'bold',
  },
  taskContainer: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  bola: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderColor: '#2088AF',
    borderWidth: 1,
    marginRight: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginLeft: 'auto',
  },
  task: {
    fontSize: 16,
  },
  completedTask: {
    fontSize: 20,
    textDecorationLine: 'line-through',
    color: '#000',
  },
  btnSpace: {
    flexDirection: 'row',
    marginLeft: 'auto',
  },
  buttonText: {
    fontSize: 18,
    marginLeft: 8,
  },
});