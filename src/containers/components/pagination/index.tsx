import React, {useMemo} from 'react';
import {Pagination as Page} from 'react-bootstrap';
import './styled.css';

export type Props = {
  page: number;
  perPage: number;
  count: number;
  pageChange: (value: number) => void;
};

export const itemWithIndex = (page: number, perPage: number, len: number) => {
  const startIndex = page * perPage - (perPage - 1);
  const endIndex = page * perPage >= len ? len : page * perPage;
  return {startIndex, endIndex};
};

export const itemWithPage = (page: number, perPage: number, data: any[]) => {
  const {startIndex, endIndex} = itemWithIndex(page, perPage, data?.length);
  return data?.slice(startIndex - 1, endIndex);
};

const Pagination = (props: Props) => {
  const allPageNumber = useMemo(() => {
    if (props.count < props.perPage) return 1;
    return Math.floor(props.count / props.perPage) + (props.count % props.perPage > 0 ? 1 : 0);
  }, [props.perPage, props.count]);

  if (allPageNumber === 1) return null;

  const _pageChange = (page: number) => () => props.pageChange(page);

  return (
    <Page className="d-flex justify-content-end">
      <Page.Prev onClick={_pageChange(props.page - 1)} disabled={props.page === 1} />
      {allPageNumber <= 6 &&
        Array(allPageNumber)
          .fill('')
          .map((_, i) => (
            <Page.Item active={i + 1 === props.page} onClick={_pageChange(i + 1)} key={i}>
              {i + 1}
            </Page.Item>
          ))}

      {allPageNumber > 6 && (
        <>
          <Page.Item active={props.page === 1} onClick={_pageChange(1)}>
            1
          </Page.Item>
          {props.page > 4 && <Page.Ellipsis />}
          {Array(4)
            .fill('')
            .map((_, i) => {
              const fromPage = props.page >= allPageNumber - 3 ? allPageNumber - 3 : props.page;
              const iPage = i + fromPage - 1;
              if (iPage <= 1) return null;
              if (iPage >= allPageNumber) return null;
              return (
                <Page.Item active={iPage === props.page} key={iPage} onClick={_pageChange(iPage)}>
                  {iPage}
                </Page.Item>
              );
            })}
          {props.page < allPageNumber - 3 && <Page.Ellipsis />}
          <Page.Item active={props.page === allPageNumber} onClick={_pageChange(allPageNumber)}>
            {allPageNumber}
          </Page.Item>
        </>
      )}
      <Page.Next onClick={_pageChange(props.page + 1)} disabled={props.page === allPageNumber} />
    </Page>
  );
};

export default Pagination;
