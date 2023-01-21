import { View, Text, ScrollView } from 'react-native';

import { Header } from '../../components/Header';
import { HabitDay, DAY_SIZE } from '../../components/HabitDay';
import { generateRangeBetweenDates } from '../../utils/geanerate-range-between-days';

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

const datesFromYearStart = generateRangeBetweenDates();
const minimumSummaryDateSizes = 18 * 5;

const amountOfDaysToFill = minimumSummaryDateSizes - datesFromYearStart.length;

export function Home() {
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
        <View className='flex-wrap flex-row'>
          {datesFromYearStart.map((date, index) => (
            <HabitDay key={`${date.toISOString()}-${index}`} />
          ))}
          {amountOfDaysToFill > 0 &&
            Array.from({ length: amountOfDaysToFill }).map((_, index) => (
              <View
                key={index}
                style={{ width: DAY_SIZE, height: DAY_SIZE }}
                className='bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40'
              />
            ))}
        </View>
      </ScrollView>
    </View>
  );
}
