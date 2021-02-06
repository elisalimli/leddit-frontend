import { useDispatch } from 'react-redux';
import { useMeQuery } from '../generated/graphql';
import { setAuthenticated } from '../redux/actions/userActions';
import { setLoading } from '../redux/actions/uiActions';

interface Props {

}

const RememberMe = (props: Props) => {
    const dispatch = useDispatch()

    const [{ data, fetching }] = useMeQuery();

    dispatch(setLoading(fetching))
    if (data?.me) dispatch(setAuthenticated(true))
    return (
        null
    )
}

export default RememberMe
