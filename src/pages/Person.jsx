import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import { getPerson } from '../features/person/personSlice';
import PersonDetails from '../components/Person/PersonDetails';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../components/Utilities/Loading';
import Error from '../components/Utilities/Error';

const Person = () => {
  const dispatch = useDispatch();
  const { person, isLoading, isError } = useSelector((state) => state.person);
  const { pathname } = useLocation();
  const personId = pathname.substring(pathname.lastIndexOf('/') + 1);
  useDocumentTitle(`${person.name}`);

  useEffect(() => {
    dispatch(getPerson(personId));
  }, [dispatch, personId]);

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return <PersonDetails />;
};

export default Person;
