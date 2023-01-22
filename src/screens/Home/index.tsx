import { View, Text, ScrollView, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

import { Header } from '../../components/Header';
import { HabitDay, DAY_SIZE } from '../../components/HabitDay';
import { generateRangeBetweenDates } from '../../utils/generate-range-between-days';
import { api } from '../../global/configs/axios';
import { useEffect, useState } from 'react';
import { Loading } from '../../components/Loading';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

const datesFromYearStart = generateRangeBetweenDates();
const minimumSummaryDateSizes = 18 * 5;

const amountOfDaysToFill = minimumSummaryDateSizes - datesFromYearStart.length;

interface IHabitsProps {
  id: string;
  date: string;
  completed: number;
  amount: number;
}

export function Home() {
  const { navigate } = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [summary, setSummary] = useState<IHabitsProps[]>([]);

  useFocusEffect(
    useCallback(() => {
      requestHabits();
    }, [])
  );

  function handleNavigateFromHabit(date: string) {
    navigate('habit', {
      date,
    });
  }

  async function requestHabits() {
    try {
      setIsLoading(true);
      const { data } = await api.get('/summary');
      console.log('requestHabits');
      console.log({ data });
      setSummary(data);
    } catch (err) {
      const error = err as AxiosError;
      Alert.alert('Ops', 'Não foi possível carregar o sumário de hábitos');
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <View className='flex-1 bg-background px-8 pt-16'>
      <Header />

      <View className='flex-row mt-6 mb-2'>
        {weekDays.map((day, index) => (
          <Text
            key={`${index}-${day}`}
            className='text-zinc-400 text-xl font-bold text-center mx-1'
            style={{ width: DAY_SIZE }}
          >
            {day}
          </Text>
        ))}
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {isLoading && <Loading />}
        {!isLoading && (
          <View className='flex-wrap flex-row'>
            {datesFromYearStart.map((date, index) => {
              const dayWithHabits = summary?.find((habit) => {
                return dayjs(date).isSame(habit.date, 'day');
              });

              return (
                <HabitDay
                  key={`${date.toISOString()}-${index}`}
                  onPressed={() => handleNavigateFromHabit(date.toISOString())}
                  amountCompleted={dayWithHabits?.completed}
                  amountOfHabits={dayWithHabits?.amount}
                  date={date}
                />
              );
            })}
            {amountOfDaysToFill > 0 &&
              Array.from({ length: amountOfDaysToFill }).map((_, index) => (
                <View
                  key={index}
                  style={{ width: DAY_SIZE, height: DAY_SIZE }}
                  className='bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40'
                />
              ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
