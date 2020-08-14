#!/usr/bin/env bash

if [ -z "$*" ]; then
 echo "put argument with Context Name"
 exit 0

fi

CONTEXT_FOLDER="context"
HOOKS_FOLDER="hooks"

FILE_NAME=$1
LOWER="$(tr '[:upper:]' '[:lower:]' <<< ${FILE_NAME})"
# LOWER=`echo "${FIRST_CAP%?}"`

# hooks file
echo `echo "import { useCreator } from '../utils/contextHelper';
import { ${FILE_NAME}Contexts } from '../context/${FILE_NAME}Context';

export const use${FILE_NAME}= () => {
  const [${LOWER}, dispatch] = useCreator(${FILE_NAME}Contexts);

  return { ${LOWER}, dispatch };

  // or make custom action creator
  // const doSomething = () => dispatch({type : 'DO_SOMETHING'})

  // return { ${LOWER}, doSomething };
};

" > src/${HOOKS_FOLDER}/use${FILE_NAME}.tsx`

# styled component file
echo `echo "import React from 'react';
import { contextCreator } from '../utils/contextHelper';

export type ${FILE_NAME} = number;

export type ${FILE_NAME}State = ${FILE_NAME};

export type ${FILE_NAME}Action =
  { type: 'ACTION_NAME' } |
  { type: 'HAS_PAYLOAD'; id: number };

const ${FILE_NAME}Reducer = (
	state: ${FILE_NAME}State,
	action: ${FILE_NAME}Action
): ${FILE_NAME}State => {
	switch (action.type) {
		case 'ACTION_NAME':
			return state;
		default:
			throw new Error('존재하지 않는 액션입니다.');
	}
};

const initial${FILE_NAME}: ${FILE_NAME}State = 0;

export const {
	ContextProvider: ${FILE_NAME}Provider,
	Contexts: ${FILE_NAME}Contexts,
} = contextCreator<${FILE_NAME}State, ${FILE_NAME}Action>(${FILE_NAME}Reducer, initial${FILE_NAME});

" > src/${CONTEXT_FOLDER}/${FILE_NAME}Context.tsx`
