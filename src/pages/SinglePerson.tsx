import { useEffect } from 'react';
import { getPerson } from '../features/person/personSlice';
import PersonDetails from '../components/SinglePerson/PersonDetails';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useAppDispatch, useAppSelector } from '../hooks';
import { useParams } from 'react-router';
import Loading from '../components/Utilities/Loading';
import Error from '../components/Utilities/Error';

const Person = () => {
  const dispatch = useAppDispatch();
  const { person, isLoading, isError } = useAppSelector(
    (state) => state.person
  );
  const { id } = useParams();
  useDocumentTitle(`${person?.name}`);

  useEffect(() => {
    dispatch(getPerson(Number(id)));
  }, [dispatch, id]);

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return <PersonDetails />;
};

export default Person;
