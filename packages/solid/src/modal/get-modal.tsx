import {
  ColorModeProvider,
  ThemeProvider,
  HopeProvider,
} from '@hope-ui/core';
import { ModalVersion, WalletModalProps } from '@cosmos-kit/core';
import { createEffect, createSignal } from 'solid-js';

// delete ModalType when finished
type ModalType = ({ isOpen, setOpen }: WalletModalProps) => JSX.Element;

export const getModal = (version: ModalVersion): ModalType => {

  const Modal: ModalType = ({ isOpen, setOpen }) => (<div></div>);
  return (
    <Modal />
  )

  // return (
  //   <>
  //   </>
  // );
};