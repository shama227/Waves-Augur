import React from 'react';
import PropTypes from 'prop-types';

import {html} from 'components';
import Modal from 'yii-steroids/ui/modal/Modal';
import Button from 'yii-steroids/ui/form/Button';

import './MessageModal.scss';

const bem = html.bem('MessageModal');

export default class MessageModal extends React.PureComponent {

    static propTypes = {
        modalProps: PropTypes.object,
        type: PropTypes.oneOf(['alert', 'confirm']),
        color: PropTypes.oneOf(['default', 'success', 'danger']),
        title: PropTypes.string,
        description: PropTypes.string,
        icon: PropTypes.string,
        submitLabel: PropTypes.string,
        onCancel: PropTypes.func,
        onSubmit: PropTypes.func,
    };

    constructor() {
        super(...arguments);

        this._onCancel = this._onCancel.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
    }

    render() {
        return (
            <Modal
                {...this.props.modalProps}
                className={bem.block()}
            >
                <div className={bem.element('content')}>
                    <h1 className={bem.element('title')}>
                        {this.props.title}
                    </h1>
                    <div className={bem.element('description')}>
                        {this.props.description}
                    </div>
                    {this.props.type === 'confirm' && (
                        <Button
                            color='primary'
                            onClick={this._onCancel}
                            label={__('No')}
                            outline
                        />
                    )}
                    <Button
                        type='submit'
                        color='primary'
                        onClick={this._onSubmit}
                        label={this.props.submitLabel || (this.props.type === 'confirm' ? __('Yes') : __('Ok'))}
                    />
                </div>
            </Modal>
        );
    }

    _onCancel(e) {
        e.preventDefault();

        this.props.onClose();
        this.props.onCancel && this.props.onCancel();
    }

    _onSubmit(e) {
        e.preventDefault();

        this.props.onClose();
        this.props.onSubmit && this.props.onSubmit();
    }
}
