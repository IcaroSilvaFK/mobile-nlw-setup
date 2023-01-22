import { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import colors from 'tailwindcss/colors';
import { Feather } from '@expo/vector-icons';

import { BackButton } from '../../components/BackButton';
import { Checkbox } from '../../components/Checkbox';
import { api } from '../../global/configs/axios';

const days = [
  {
    day: 'Domingo',
    value: 0,
  },
  {
    day: 'Segunda-feira',
    value: 1,
  },
  {
    day: 'Terça-feira',
    value: 2,
  },
  {
    day: 'Quarta-feira',
    value: 3,
  },
  {
    day: 'Quinta-feira',
    value: 4,
  },
  {
    day: 'Sexta-feira',
    value: 5,
  },
  {
    day: 'Sábado',
    value: 6,
  },
];

export function NewHabit() {
  const [daysSelected, setDaysSelected] = useState<number[]>([]);
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleAddOrRemoveDayInSelectedDay(day: number) {
    const existsDayInSelectedDays = daysSelected.includes(day);

    if (existsDayInSelectedDays) {
      return setDaysSelected((prev) => prev.filter((value) => value !== day));
    }

    if (!existsDayInSelectedDays) {
      return setDaysSelected((prev) => [...prev, day]);
    }
  }

  async function onSubmit() {
    try {
      setIsSubmitting(true);
      await api.post('/habits', {
        title,
        weekDays: daysSelected,
      });

      setDaysSelected([]);
      setTitle('');
    } catch (err) {
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <View className='flex-1 bg-background px-8 pt-16'>
      <ScrollView showsVerticalScrollIndicator={false}>
        <BackButton />
        <Text className='mt-6 text-white font-extrabold text-3xl'>
          Criar hábito
        </Text>
        <Text className='mt-6 text-zinc-300 font-semibold text-base'>
          Qual seu compromentimento?
        </Text>

        <TextInput
          className='h-12 pl-4 rounded-lg mt-3 bg-zinc-800 border-zinc-400 text-white focus:border-2 focus:border-green-600'
          placeholder='Exercícios, dormir bem, etc...'
          placeholderTextColor={colors.white}
          value={title}
          onChangeText={setTitle}
        />
        <Text className='mt-6 text-zinc-300 font-semibold text-base'>
          Qual a recorrência ?
        </Text>
        <View className='mt-2'>
          {days.map(({ value, day }) => (
            <Checkbox
              key={day}
              value={value}
              label={day}
              onPress={handleAddOrRemoveDayInSelectedDay}
              checked={daysSelected.includes(value)}
            />
          ))}
        </View>

        <TouchableOpacity
          className='flex-row w-full h-14 items-center justify-center bg-green-600 rounded-md mt-6'
          activeOpacity={0.7}
          onPress={onSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <>
              <Feather name='check' size={20} color={colors.white} />
              <Text className='font-semibold text-base text-white ml-2'>
                Confirmar
              </Text>
            </>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
