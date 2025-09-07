import { async } from '@firebase/util';
import { asString } from 'ol/color';
import * as xlsx from "xlsx"
import React, { useState, useEffect } from 'react';
import { addFirebaseItem, clearFirebaseItem, getFirebaseItems, download, updateFirebaseItem } from '../../firebase/firebase';

function Dubao() {
  return (
  <iframe width="100%" height="650px" src='https://vrain.vn/landing'></iframe>
  );
}

export default Dubao;