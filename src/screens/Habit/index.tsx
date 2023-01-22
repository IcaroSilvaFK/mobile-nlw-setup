import { View, ScrollView, Text, Alert } from 'react-native';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import dayjs from 'dayjs';

import { BackButton } from '../../components/BackButton';
import { ProgressBar } from '../../components/ProgressBar';
import { Checkbox } from '../../components/Checkbox';
import { api } from '../../global/configs/axios';
import { Loading } from '../../components/Loading';
import { generateProgressPercentage } from '../../utils/generate-progress-percentage';
import { HabitsEmpty } from '../../components/HabitsEmpty';

interface Params {
  date: string;
}

interface IHabitsProps {
  id: string;
  title: string;
  createdAd: string;
}

interface IHabitStateProps {
  completedHabits: string[];
  possibleHabits: IHabitsProps[];
}

export function Habit() {
  const { params } = useRoute();
  const { date } = params as Params;
  const [isLoading, setIsLoading] = useState(true);
  const [habitsFromDate, setHabitsFromDate] = useState<IHabitStateProps>(
    {} as IHabitStateProps
  );

  const parsedDate = dayjs(date);
  const dayOfWeek = parsedDate.format('dddd');
  const dayAndMonth = parsedDate.format('DD/MM');
  const isDateInPast = dayjs(date).endOf('day').isBefore(new Date());
  const completedHabitsLength = habitsFromDate?.completedHabits?.length;
  const possibleHabitsLength = habitsFromDate?.possibleHabits?.length;
  const progress =
    possibleHabitsLength > 0
      ? generateProgressPercentage(completedHabitsLength, possibleHabitsLength)
      : 0;

  console.log({ completedHabitsLength, possibleHabitsLength, progress });

  useFocusEffect(
    useCallback(() => {
      handleRequestHabit();
    }, [date])
  );

  async function handleRequestHabit() {
    try {
      setIsLoading(true);

      const { data } = await api.get<IHabitStateProps>('/day', {
        params: {
          date,
        },
      });

      setHabitsFromDate(data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCheckHabit(habitId: string) {
    try {
      if (isDateInPast) {
        return Alert.alert(
          'Ops.',
          'Não é possivel marcar um hábito anterior a data atual.'
        );
      }

      await api.patch(`/habits/${habitId}/toggle`);

      checkItem(habitId);
    } catch (err) {
      Alert.alert('Opa tivemos um problema!', 'Infelizmente tivemos um erro!');
      console.log(err);
    }
  }

  function checkItem(id: string) {
    const habitExists = habitsFromDate.completedHabits.includes(id);

    if (habitExists) {
      setHabitsFromDate((prev) => ({
        ...prev,
        completedHabits: prev.completedHabits.filter((habit) => habit !== id),
      }));
    }
    if (!habitExists) {
      setHabitsFromDate((prev) => ({
        ...prev,
        completedHabits: [...prev.completedHabits, id],
      }));
    }
  }

  return (
    <View className='flex-1 bg-background px-8 pt-16'>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />

        <Text className='mt-6 text-zinc-400 font-semibold text-base lowercase'>
          {dayOfWeek}
        </Text>

        <Text className='text-white font-extrabold text-3xl'>
          {dayAndMonth}
        </Text>

        <ProgressBar progress={progress} />

        <View className='flex-1 mt-8'>
          {isLoading && <Loading />}
          {!habitsFromDate?.possibleHabits?.length && <HabitsEmpty />}
          {habitsFromDate?.possibleHabits?.map((habit) => (
            <Checkbox
              checked={habitsFromDate.completedHabits.includes(habit.id)}
              label={habit.title}
              onPress={() => handleCheckHabit(habit.id)}
              key={habit.id}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
