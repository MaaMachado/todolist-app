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
      <FlatList
        data={tarefas}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.taskContainer}>
            <Text
              style={{
                ...styles.task,
                textDecorationLine: item.concluida ? 'line-through' : 'none',
              }}
            >
              {item.texto}
            </Text>
            <Button
              title={item.concluida ? 'Desfazer' : 'Concluir'}
              onPress={() => marcarConcluida(index)}
            />
            <Button title="Excluir" onPress={() => excluirTarefa(index)} />
          </View>
        )}
      />
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
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
    marginRight: 8,
    padding: 8,
  },
  addButton: {
    backgroundColor: '#2088AF',
    padding: 8,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  task: {
    fontSize: 18,
  },
  completedTask: {
    fontSize: 18,
    textDecorationLine: 'line-through',
    color: '#999',
  },
  deleteButton: {
    color: 'red',
    marginLeft: 8,
  },
});