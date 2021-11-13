import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getTransactionsByMonts,
  getTransactionsList,
} from '../../redux/transactions';

import { getCategoriesList, getCategories } from '../../redux/categories';
import s from './ReportPage.module.css';
import HeaderReport from '../../components/Reports/HeaderReport';
import CurrentMonthReport from '../../components/Reports/CurrentMonthReport';
import HeaderSection from '../../components/HeaderSection/HeaderSection';

export default function ReportPage() {
  const dispatch = useDispatch();

  const date = new Date();

  const [month, setMonth] = useState(date.getMonth() + 1);
  const [year, setYear] = useState(date.getFullYear());
  const [type, setType] = useState(false);

  const handleChangeMonthRight = () => {
    if (month < 12) {
      setMonth(prev => (prev += 1));
    } else {
      setMonth(1);
      setYear(prev => (prev += 1));
    }
  };
  const handleChangeMonthLeft = () => {
    if (month <= 1) {
      setMonth(12);
      setYear(prev => (prev -= 1));
    } else {
      setMonth(prev => (prev -= 1));
    }
  };
  const handleChangeTypeTrans = () => {
    if (type === false) {
      setType(true);
      console.log(type);
    }
    if (type === true) {
      setType(false);
      console.log(type);
    }
  };
  useEffect(() => {
    const period = `${year}${month} `;
    console.log(period);
    dispatch(getCategoriesList());
    dispatch(getTransactionsByMonts(period));
  }, [dispatch, year, month]);

  const transactions = useSelector(getTransactionsList);
  console.log(transactions);

  return (
    <div className={s.reportContainer}>
      <HeaderSection
        typePage="report"
        month={month}
        year={year}
        handleChangeMonthLeft={handleChangeMonthLeft}
        handleChangeMonthRight={handleChangeMonthRight}
      />
      <HeaderReport transactionsMonth={transactions} />
      <CurrentMonthReport
        typeTrans={type}
        handleChangeTypeTrans={handleChangeTypeTrans}
        transactionsCurrentMonth={transactions}
      />
    </div>
  );
}
