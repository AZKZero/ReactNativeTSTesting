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
import React from 'react';
import {StyleSheet, Text, useColorScheme, View} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {Home} from './Home';
import {createState} from '@hookstate/core';
import {EE1DCounterScreen} from './TextHookTest';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {RequestConfig, ServiceBuilder, Response} from 'ts-retrofit';
import {OperatorList} from './operator-module/OperatorList';
import {OperatorService} from './api/retrofit';
import {OperatorDetails} from './operator-module/OperatorDetails';
import {Blog} from './db/blog';
import {Author} from './db/author';
import {DataSource} from 'typeorm';
import {DBList} from './db-testing-module/DBList';
import {CreateBlog} from './db-testing-module/CreateBlog';

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
  Maximilan: undefined;
  OpDetails: {id: string};
  DBModule: undefined;
  CreateBlog: undefined;
};

const Stack = createNativeStackNavigator<StackParamMap>();

export type Props = NativeStackScreenProps<StackParamMap, 'Home'>;
export type OpProp = NativeStackScreenProps<StackParamMap, 'OpDetails'>;

export const EE1D = createState({uses: 3, cooldown: 0});

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

class App extends React.Component {
  constructor(props: Readonly<{}> | {}) {
    super(props);
    this.connect().then((datasource: DataSource) =>
      this.seedServer(datasource),
    );
  }

  async seedServer(datasource: DataSource) {
    dataSource = datasource;
    const author = await datasource
      .getRepository(Author)
      .save(new Author('P u l s e w r a i t h'));
    console.log(JSON.stringify(author));
    const blog1 = new Blog(
      'Blog 1- Rafia apuke jalaitesi',
      'Ajke rafia apur ashepashe asi, uni ar shimon vai ki jeno shikhtese',
      author,
    );
    const blog2 = new Blog(
      'Blog 2 - Rafia apu confused ken jani',
      'ki jani ki bostu',
      author,
    );
    const blogRepository = dataSource.getRepository(Blog);
    await blogRepository.save(blog1);
    await blogRepository.save(blog2);
  }

  connect() {
    return new DataSource({
      type: 'react-native',
      database: 'test',
      location: 'default',
      logging: ['error', 'query', 'schema'],
      synchronize: true,
      entities: [Author, Blog],
    }).initialize();
  }
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Maximilan">
          <Stack.Screen
            name="HookTest"
            options={{title: 'EY?'}}
            component={EE1DCounterScreen}
          />
          <Stack.Screen
            name="Maximilan"
            options={{title: 'Operators'}}
            component={OperatorList}
          />
          <Stack.Screen
            name="DBModule"
            options={{title: 'BlogList'}}
            component={DBList}
          />
          <Stack.Screen
            name="CreateBlog"
            options={{title: 'Create Blog'}}
            component={CreateBlog}
          />
          <Stack.Screen
            name="OpDetails"
            options={({route}: OpProp) => ({title: route.params.id})}
            component={OperatorDetails}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{title: 'Home?'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

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
export const service = new ServiceBuilder()
  .setEndpoint('http://192.168.88.123:3000')
  .setLogCallback(myLogCallback)
  .build(OperatorService);
