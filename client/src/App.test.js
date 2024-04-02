import React from 'react';
import { getByTestId, render } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import axiosMock from "axios";
import App from './root/App';

it('it displays default header items', () => {
 
   const {getByTestId} = render(<App  />);
   const header = getByTestId('header');
   expect(header.children.length).toBe(3);  
 });
 
 it('it displays default background items', () => {
   const {getByTestId} = render(<App  />);
   const background = getByTestId('background');
   expect(background.children.length).toBe(1);  
 });
 
 it('it displays default tableMenu items', () => {
   const {getByTestId} = render(<App/>);
   const tableMenu = getByTestId('tableMenu');
   expect(tableMenu.children.length).toBe(1);  
 });

 it("fetchs and displays data", async() => {
  const url=`http://localhost:3001/api/get/avg_pace`;
  const {getByTestId} = render(<App/>);
  const loading = getByTestId("loading");
  expect(loading.children.length).toBe(1);
})
 
 
 