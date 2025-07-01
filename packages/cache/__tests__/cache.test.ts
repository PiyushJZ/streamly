import Cache from "../lib/cache";

interface TestData {
  message: string;
}

async function testCache() {
  const key = "test:key";
  const value: TestData = { message: "Hello, Redis!" };

  await Cache.set(key, value, 60);
  const retrieved = await Cache.get<TestData>(key);
  console.log("Retrieved from Cache:", retrieved);

  const exists = await Cache.exists(key);
  console.log("Key exists:", exists);

  const result = await Cache.get<TestData>(key);
  console.log("Result from Cache:", result);

  await Cache.del(key);
  const afterDeletion = await Cache.get<TestData>(key);
  console.log("After deletion:", afterDeletion);

  await Cache.disconnect();
}

testCache();
