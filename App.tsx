/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import 'reflect-metadata';
import React, {useEffect} from 'react';
import {Linking, StyleSheet, Text, useColorScheme, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {Home} from './Home';
import {createState, useState} from '@hookstate/core';
import {EE1DCounterScreen} from './TextHookTest';
import {createNativeStackNavigator, NativeStackScreenProps} from '@react-navigation/native-stack';
import {RequestConfig, Response, ServiceBuilder} from 'ts-retrofit';
import {OperatorList} from './operator-module/OperatorList';
import {OperatorService} from './api/retrofit';
import {OperatorDetails} from './operator-module/OperatorDetails';
// import {Blog} from './db/blog-active';
// import {Author} from './db/author-active';
import {DataSource} from 'typeorm';
import {DBList} from './db-testing-module/DBList';
import {CreateBlog} from './db-testing-module/CreateBlog';
import {LoginScreen} from './auth/Login';
import {Author} from './db/author';
import {Blog} from './db/blog';
import {InfinityTangent} from './test-ui/InfinityTangent';

/*export const TSafeTemplate: React.FC<{children: any; state: State<any>}> = ({
  childrem,
  state,
}) => {

};*/

export const Section: React.FC<{
  children: any;
  title: string;
}> = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

export type StackParamMap = {
  Home: undefined;
  HookTest: undefined;
  OpList: undefined;
  OpDetails: {id: string};
  DBModule: undefined;
  CreateBlog: undefined;
  Login: undefined;
  InfinityTangent: undefined;
};

const Stack = createNativeStackNavigator<StackParamMap>();

export type Props = NativeStackScreenProps<StackParamMap, 'Home'>;
export type OpProp = NativeStackScreenProps<StackParamMap, 'OpDetails'>;

export const EE1D = createState({uses: 3, cooldown: 0});
export const loggedIn = createState(false);

/*interface Properties<T> {
  renderItem: (item: T) => React.ReactNode;
  state: State<T | null>;
}*/

/*export const TSafeTemplate = <T extends any>({
  state,
  renderItem,
}: Properties<T>) => {
  const value = state.get();
  if (value !== null) {
    return renderItem(value);
  }
  return <></>;
};*/

export let dataSource: DataSource;

/*this.connect().then((datasource: DataSource) =>
      this.seedServer(datasource),
    );*/

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function seedServer(datasource: DataSource) {
  dataSource = datasource;
  // await datasource.getRepository(Author).clear();
  // await datasource.getRepository(Blog).clear();
  const authorRepository = dataSource.getRepository(Author);
  const blogRepository = dataSource.getRepository(Blog);

  // IMPLEMENTATION 1
  /* const author = new Author('P u l s e w r a i t h');
  await datasource.getRepository(Author).save(author);*/

  // IMPLEMENTATION 2
  /*const data = new Author();
  data.name = 'P u l s e w r a i t h';
  const author = await datasource.getRepository(Author).save(data);*/
  // IMPLEMENTATION 3
  const author = new Author();
  author.name = 'P u l s e w r a i t h';
  let insertResult = await authorRepository.createQueryBuilder().insert().into(Author).updateEntity(true).values(author).execute();
  console.log(JSON.stringify(insertResult));
  console.log(JSON.stringify(author));
  // IMPLEMENTATION 4
  /*const data = new Author();
  data.name = 'P u l s e w r a i t h';
  const author = await Author.save(data);*/

  console.log(JSON.stringify(author));
  const blog1 = new Blog('Blog 1', 'Content 1', author);
  const blog2 = new Blog('Blog 2', 'Content 2', author);
  console.log(JSON.stringify(await blogRepository.save(blog1, {reload: true})));
  console.log(JSON.stringify(await blogRepository.save(blog2)));
  // console.log(JSON.stringify(await blog1.save()));
  // console.log(JSON.stringify(await blog2.save()));

  console.log(JSON.stringify(await authorRepository.find()));
  console.log(JSON.stringify(await blogRepository.find()));
  // console.log(JSON.stringify(await Author.find()));
  // console.log(JSON.stringify(await Blog.find()));
}

/*async function connect() {
  return new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'test',
    password: 'test',
    database: 'test',
    logging: ['error', 'query', 'schema'],
    synchronize: true,
    entities: [Author, Blog],
  }).initialize();
}*/
const App = () => {
  useEffect(() => {
    // connect().then(value => seedServer(value));
    loggedInLocal.set(true);
    Linking.canOpenURL('ops://operators_list/operator_details?id=hibana').then(async value => {
      console.log(`Can Open Url? ${value}`);
      console.log(`Initial Url ${await Linking.getInitialURL()}`);
      /*const initialUrl = await Linking.getInitialURL();
        Linking.addEventListener('url', event => {

        });*/
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const loggedInLocal = useState(loggedIn);
  const hasRouted = useState(false);
  const linking = {
    prefixes: ['ops://'],
    config: {
      initialRouteName: 'OpList',
      screens: {
        OpList: {
          path: 'operators_list',
        },
        OpDetails: {
          path: 'operator_details',
        },
        NoMatch: '*',
      },
    },
  };
  return (
    // @ts-ignore
    <NavigationContainer linking={loggedInLocal.get() && linking}>
      <Stack.Navigator
        screenListeners={async props => {
          if (
            props.route.name === 'OpList' &&
            (await Linking.getInitialURL()) != null &&
            loggedInLocal.get({stealth: true}) &&
            !hasRouted.get({stealth: true})
          ) {
            hasRouted.set(true);
            await Linking.openURL((await Linking.getInitialURL()) as string);
          }
          return props;
        }}>
        {loggedInLocal.get() ? (
          <>
            <Stack.Screen name="OpList" options={{title: 'Operators'}} component={OperatorList} />
            <Stack.Screen name="OpDetails" options={({route}: OpProp) => ({title: route.params.id})} component={OperatorDetails} />
            <Stack.Screen name={'InfinityTangent'} options={{title: 'Infinity Tagnent'}} component={InfinityTangent} />
            <Stack.Screen name="HookTest" options={{title: 'EY?'}} component={EE1DCounterScreen} />
            <Stack.Screen name="DBModule" options={{title: 'BlogList'}} component={DBList} />
            <Stack.Screen name="CreateBlog" options={{title: 'Create Blog'}} component={CreateBlog} />
            <Stack.Screen name="Home" component={Home} options={{title: 'Home?'}} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" options={{title: 'Login'}} component={LoginScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

const myLogCallback = (config: RequestConfig, response: Response) => {
  const log = `[${config.method}] ${config.url} ${response.status} `; //${JSON.stringify(response.data)}
  console.log(log); // [GET] http://localhost:12345/ping 200
};
export const service = new ServiceBuilder().setEndpoint('http://192.168.88.150:3000').setLogCallback(myLogCallback).build(OperatorService);
// export const service = new ServiceBuilder().setEndpoint('http://192.168.0.105:3000').setLogCallback(myLogCallback).build(OperatorService);
