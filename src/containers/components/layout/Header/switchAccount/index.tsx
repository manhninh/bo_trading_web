import {useAppSelector} from 'boot/configureStore';
import React, {useEffect, useState} from 'react';
import {Dropdown} from 'react-bootstrap';
import {useDispatch} from 'react-redux';
import {changeTypeUser} from 'routers/redux/slice';
import {formatter2} from 'utils/formatter';
import {AccountType, State} from './propState';
import './styled.css';

const SwitchAccountComponent = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState<State>({
    currentAccount: {type: 0, type_name: 'Live Account', amount: 0},
    listAccountOther: [],
  });
  const accountInfor = useAppSelector((state) => state.authState.accountInfor);

  useEffect(() => {
    let currentAccount = {type: 0, type_name: 'Live Account', amount: 0};
    const listAccountOther: AccountType[] = new Array();
    switch (accountInfor.type_user) {
      case 1:
        currentAccount = {type: 1, type_name: 'Demo Account', amount: accountInfor.amount_demo};
        listAccountOther.push({type: 0, type_name: 'Live Account', amount: accountInfor.amount_trade});
        break;
      default:
        currentAccount = {type: 0, type_name: 'Live Account', amount: accountInfor.amount_trade};
        listAccountOther.push({type: 1, type_name: 'Demo Account', amount: accountInfor.amount_demo});
        break;
    }
    setState({currentAccount, listAccountOther});
  }, [accountInfor.type_user]);

  const _switchAccount = (type: number) => () => {
    dispatch(changeTypeUser(type));
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" className="nav-link language dropdown-toggle border-new div-main">
        <div className="div-group">
          <span className="type-account text-bold">{state.currentAccount.type_name}</span>
          <span className="amount-account text-bold">$ {state.currentAccount.amount}</span>
        </div>
      </Dropdown.Toggle>

      <Dropdown.Menu className="border-new">
        {state.listAccountOther.length > 0 &&
          state.listAccountOther.map((item: AccountType, index: number) => (
            <Dropdown.Item
              key={`drop-down-item-${index}`}
              className="dropdown-item border-new"
              onClick={_switchAccount(item.type)}>
              <div className="div-group m-1-3rem">
                <span className="type-account text-bold text-danger">{item.type_name}</span>
                <span className="amount-account text-bold text-danger">$ {formatter2.format(item.amount)}</span>
              </div>
            </Dropdown.Item>
          ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default React.memo(SwitchAccountComponent);
