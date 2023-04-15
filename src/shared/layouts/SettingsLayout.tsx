import { Outlet, useLocation, useParams } from "react-router-dom";
import PageTitle from "../../components/pageStructure/PageTitle";
import LinkBar from "../../components/pageStructure/LinkBar";
import routes from "../consts/routes";
import { useEffect, useState } from "react";

const data = [
  {
    title: "Name",
    item: "DYDX-USDT",
  },
  {
    title: "Price",
    item: "DYDX-USDT",
  },
  {
    title: "Exchange",
    item: "DYDX-USDT",
  },
  {
    title: "Pair",
    item: "DYDX-USDT",
  },
  {
    title: "Strategy",
    item: "DYDX-USDT",
  },
  {
    title: "Created by",
    item: "DYDX-USDT",
  },
  {
    title: "Started at",
    item: "DYDX-USDT",
  },
];

const SettingsLayout = () => {
  const { pathname } = useLocation();
  const [pageTitle, setPageTitle] = useState("");

  const links = [
    {
      label: "Add new bot",
      to: routes.botsNew,
    },
    {
      label: "My bots",
      to: routes.myBots,
    },
  ];

  useEffect(() => {
    const title = links.find((link) => pathname === link.to)?.label;
    setPageTitle(title || "");
  }, [pathname]);

  return (
    <div>
      <PageTitle title={pageTitle} />
      <LinkBar links={links} />
      <Outlet />
    </div>
  );
};

export default SettingsLayout;
