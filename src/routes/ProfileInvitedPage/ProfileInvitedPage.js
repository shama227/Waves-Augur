import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {openModal} from 'yii-steroids/actions/modal';

import {dal, html} from 'components';
import ActionButtonBlock from 'shared/ActionButtonBlock';
import InviteUserModal from 'modals/InviteUserModal';
import UserCard from 'shared/UserCard';

import './ProfileInvitedPage.scss';
import List from 'yii-steroids/ui/list/List';
import UserSchema from 'types/UserSchema';

const bem = html.bem('ProfileInvitedPage');

@dal.hoc(
    props => dal.getUserInvites(props.user.address)
        .then(items => ({items}))
)
@connect()
export default class ProfileInvitedPage extends React.PureComponent {

    static propTypes = {
        items: PropTypes.arrayOf(UserSchema),
        isMe: PropTypes.bool,
    };

    render() {
        return (
            <div className={bem.block()}>
                {this.props.isMe && (
                    <ActionButtonBlock
                        title={__('Invite New User')}
                        iconClass={'Icon__invite-user_small'}
                        onClick={() => this.props.dispatch(openModal(InviteUserModal))}
                    />
                )}
                <div className={bem.element('card-list')}>
                    <List
                        listId='ProfileInvitedPage'
                        itemView={UserCard}
                        emptyText={__('No invited users')}
                        items={this.props.items}
                    />
                </div>
            </div>
        );
    }
}
