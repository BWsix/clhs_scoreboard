import {
  ActionIcon,
  Button,
  Center,
  Checkbox,
  Collapse,
  Group,
  InputWrapper,
  Slider,
} from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import React from "react";
import { AppShellContainerTitle } from "src/components/Others/AppShellContainerTitle";
import { trpc } from "src/utils/trpc";
import { Filter } from "tabler-icons-react";
import { NewsTable } from "./News.Table";
import { useSettings } from "./useSettings";

export const News = () => {
  const { persistPinned, setPersistPinned, setThreshold, threshold } =
    useSettings();
  const [opened, toggleOpened] = useToggle(false, [false, true]);

  const newsQuery = trpc.useInfiniteQuery(["news", {}], {
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  if (newsQuery.isError) {
    return <>{newsQuery.error.message}</>;
  }

  if (!newsQuery.data) {
    return <></>;
  }

  const news = newsQuery.data.pages
    .map(({ newsList }) => newsList)
    .reduce((prev, next) => prev.concat(next));

  return (
    <>
      <Group style={{ display: "flex", justifyContent: "space-between" }}>
        <AppShellContainerTitle title="官網公告" />
        <ActionIcon onClick={() => toggleOpened()}>
          <Filter />
        </ActionIcon>
      </Group>

      <Collapse in={opened}>
        <InputWrapper
          mt="sm"
          label={`只顯示點閱超過 ${threshold * 10} 次的公告`}
          sx={{ flex: 1 }}
        >
          <Slider
            sx={{ flex: 1 }}
            label={threshold * 10}
            defaultValue={threshold}
            onChange={setThreshold}
          />
        </InputWrapper>

        <Checkbox
          mx="auto"
          mt="sm"
          label="不隱藏被釘選的公告"
          checked={persistPinned}
          onChange={(event) => setPersistPinned(event.currentTarget.checked)}
        />
      </Collapse>

      <NewsTable
        news={news}
        persistPinned={persistPinned}
        threshold={threshold}
      />

      <Center>
        <Button
          variant="outline"
          mt="md"
          onClick={() => newsQuery.fetchNextPage()}
          loading={newsQuery.isFetchingNextPage}
        >
          載入更多
        </Button>
      </Center>
    </>
  );
};