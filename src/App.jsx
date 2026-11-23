import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";

import {
  LogIn,
  UserPlus,
  LayoutDashboard,
  Utensils,
  Users,
  Wallet,
  Receipt,
  LogOut,
  Hotel,
  CalendarDays,
  RefreshCw,
} from "lucide-react";

import api, {
  saveSession,
  getLoggedInUser,
  clearSession,
} from "./api";

const money = (n) =>
  `₹${Number(n || 0).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  })}`;

function Auth({ mode, onAuth }) {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    password: "",
    roomNumber: "",
  });

  const [err, setErr] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr("");

    try {
      const { data } = await api.post(`/auth/${mode}`, form);

      saveSession(data.token, data.user);

      onAuth(data.user);

      nav(data.user.role === "admin" ? "/admin" : "/dashboard");
    } catch (e) {
      setErr(
        e.response?.data?.message ||
          "Could not connect to server"
      );
    }
  };

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="brand-mark">
          <Hotel />
        </div>

        <h1>
          {mode === "login"
            ? "Welcome back"
            : "Join Mondal Mess"}
        </h1>

        <p className="muted">
          Mondal Mess & Hotel · Meal management
        </p>

        <form onSubmit={submit}>
          {mode === "register" && (
            <>
              <label>
                Full name
                <input
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                  placeholder="Your name"
                />
              </label>

              <label>
                Room number (optional)
                <input
                  value={form.roomNumber}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      roomNumber: e.target.value,
                    })
                  }
                  placeholder="Room no."
                />
              </label>
            </>
          )}

          <label>
            Mobile number
            <input
              required
              inputMode="numeric"
              maxLength="10"
              value={form.mobile}
              onChange={(e) =>
                setForm({
                  ...form,
                  mobile: e.target.value,
                })
              }
              placeholder="10-digit mobile"
            />
          </label>

          <label>
            Password
            <input
              required
              type="password"
              minLength="8"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
              placeholder="At least 8 characters"
            />
          </label>

          {err && <div className="alert">{err}</div>}

          <button className="btn primary full">
            {mode === "login" ? "Login" : "Create account"}
          </button>
        </form>

        <p className="auth-switch">
          {mode === "login"
            ? "New customer? "
            : "Already registered? "}

          <Link
            to={mode === "login" ? "/register" : "/login"}
          >
            {mode === "login" ? "Register" : "Login"}
          </Link>
        </p>

        <Link className="back-home" to="/">
          ← Back to home
        </Link>
      </div>
    </div>
  );
}

function Landing() {
  return (
    <div className="landing">
      <nav className="topnav">
        <Link className="brand" to="/">
          <span className="brand-mark small">
            <Hotel />
          </span>

          <span>
            Mondal Mess
            <small>& Hotel</small>
          </span>
        </Link>

        <div>
          <Link className="nav-link" to="/login">
            Login
          </Link>

          <Link className="btn primary" to="/register">
            Get started
          </Link>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">
            SMART MESS MANAGEMENT
          </span>

          <h1>
            Your meals.
            <br />
            <em>Your monthly account.</em>
          </h1>

          <p>
            Track daily meals, know your monthly bill, and
            keep every payment organized—all in one simple
            place.
          </p>

          <div className="hero-actions">
            <Link className="btn primary" to="/register">
              Create customer account
              <UserPlus size={18} />
            </Link>

            <Link className="btn secondary" to="/login">
              Login
              <LogIn size={18} />
            </Link>
          </div>

          <div className="trust">
            <span>✓ Meal tracking</span>
            <span>✓ Clear billing</span>
            <span>✓ Payment history</span>
          </div>
        </div>

        <div className="hero-visual">
          <div className="visual-glow"></div>

          <div className="meal-card">
            <div className="meal-card-head">
              <span>MONTHLY SUMMARY</span>
              <span className="status-pill">● Current</span>
            </div>

            <div className="amount">{money(2200)}</div>

            <p className="muted">
              Meal bill · Sample preview
            </p>

            <div className="mini-row">
              <span>Meals recorded</span>
              <b>65</b>
            </div>

            <div className="mini-row">
              <span>Paid so far</span>
              <b className="green">{money(1500)}</b>
            </div>

            <div className="mini-row due">
              <span>Balance due</span>
              <b>{money(700)}</b>
            </div>

            <div className="progress">
              <span />
            </div>

            <div className="meal-tags">
              <span>Breakfast</span>
              <span>Lunch</span>
              <span>Dinner</span>
            </div>
          </div>

          <div className="floating-note">
            <span className="note-icon">
              <Receipt size={18} />
            </span>

            <span>
              <b>Monthly receipt</b>
              <small>Ready when you need it</small>
            </span>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="section-heading">
          <span className="eyebrow">
            MADE FOR DAILY LIFE
          </span>

          <h2>Everything in one place</h2>

          <p>
            Simple for customers. Powerful for the hotel owner.
          </p>
        </div>

        <div className="feature-grid">
          <Feature
            icon={<CalendarDays />}
            title="Daily meal records"
            text="Keep breakfast, lunch and dinner records organized by date."
          />

          <Feature
            icon={<Wallet />}
            title="Automatic billing"
            text="Meal totals and outstanding balances are calculated automatically."
          />

          <Feature
            icon={<Receipt />}
            title="Payment history"
            text="Know what you paid and what is still due."
          />

          <Feature
            icon={<Users />}
            title="Admin control"
            text="Manage customers, meal prices and monthly accounts."
          />
        </div>
      </section>

      <footer>
        © {new Date().getFullYear()} Mondal Mess & Hotel
        <span>Meal management made simple.</span>
      </footer>
    </div>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="feature">
      <div className="feature-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

function App() {
  // Refresh hole localStorage theke user load korbe
  const [user, setUser] = useState(() => getLoggedInUser());

  const logout = () => {
    clearSession();
    setUser(null);
  };

  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      <Route
        path="/login"
        element={<Auth mode="login" onAuth={setUser} />}
      />

      <Route
        path="/register"
        element={<Auth mode="register" onAuth={setUser} />}
      />

      <Route
        path="/dashboard"
        element={
          user ? (
            <Dashboard user={user} logout={logout} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route
        path="/admin"
        element={
          user?.role === "admin" ? (
            <Dashboard user={user} logout={logout} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function Dashboard({ user, logout }) {
  const [month, setMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );

  const [data, setData] = useState(null);
  const [users, setUsers] = useState([]);
  const [types, setTypes] = useState([]);
  const [records, setRecords] = useState([]);
  const [payments, setPayments] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const [mealForm, setMealForm] = useState({
    userId: "",
    mealTypeId: "",
    mealDate: new Date().toISOString().slice(0, 10),
  });

  const [paymentForm, setPaymentForm] = useState({
    userId: "",
    billingMonth: month,
    amount: "",
    paymentMethod: "Cash",
    paymentDate: new Date().toISOString().slice(0, 10),
  });

  const [priceForm, setPriceForm] = useState({
    name: "",
    currentPrice: "",
  });

  const admin = user.role === "admin";

  const refresh = async () => {
    setLoading(true);

    try {
      if (admin) {
        const [d, u, t, p] = await Promise.all([
          api.get("/admin/dashboard", {
            params: { month },
          }),
          api.get("/admin/users"),
          api.get("/admin/meal-types"),
          api.get("/admin/payments", {
            params: { month },
          }),
        ]);

        setData(d.data);
        setUsers(u.data);
        setTypes(t.data);
        setPayments(p.data);

        const r = await api.get("/meals", {
          params: { month },
        });

        setRecords(r.data);
      } else {
        const [d, t, r, p] = await Promise.all([
          api.get("/user/dashboard", {
            params: { month },
          }),
          api.get("/meals/types"),
          api.get("/meals", {
            params: { month },
          }),
          api.get("/user/payments"),
        ]);

        setData(d.data);
        setTypes(t.data);
        setRecords(r.data);
        setPayments(p.data);
      }
    } catch (e) {
      setMessage(
        e.response?.data?.message ||
          "Unable to load data. Check server connection."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, [month]);

  const addMeal = async (e) => {
    e.preventDefault();

    try {
      await api.post("/meals", {
        ...mealForm,
        userId: admin ? mealForm.userId : undefined,
        status: "served",
      });

      setMessage("Meal recorded successfully");
      refresh();
    } catch (e) {
      setMessage(
        e.response?.data?.message ||
          "Could not add meal"
      );
    }
  };

  const addType = async (e) => {
    e.preventDefault();

    try {
      await api.post("/admin/meal-types", {
        name: priceForm.name,
        currentPrice: Number(priceForm.currentPrice),
      });

      setPriceForm({
        name: "",
        currentPrice: "",
      });

      setMessage("Meal type added");
      refresh();
    } catch (e) {
      setMessage(
        e.response?.data?.message ||
          "Could not add meal type"
      );
    }
  };

  const changePrice = async (t) => {
    const val = prompt(
      `New price for ${t.name}`,
      t.currentPrice
    );

    if (val === null) return;

    try {
      await api.patch(`/admin/meal-types/${t._id}`, {
        currentPrice: Number(val),
      });

      setMessage(
        "Price updated. Past meal prices remain unchanged."
      );

      refresh();
    } catch (e) {
      setMessage(
        e.response?.data?.message ||
          "Update failed"
      );
    }
  };

  const addPayment = async (e) => {
    e.preventDefault();

    try {
      await api.post("/admin/payments", {
        ...paymentForm,
        amount: Number(paymentForm.amount),
      });

      setMessage("Payment recorded");
      refresh();
    } catch (e) {
      setMessage(
        e.response?.data?.message ||
          "Payment failed"
      );
    }
  };

  const bill = admin ? null : data?.bill;

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Link className="brand side-brand" to="/">
          <span className="brand-mark">
            <Hotel />
          </span>

          <span>
            Mondal Mess
            <small>& Hotel</small>
          </span>
        </Link>

        <div className="side-label">WORKSPACE</div>

        <div className="side-item active">
          <LayoutDashboard size={18} />
          Dashboard
        </div>

        <div className="side-item">
          <Utensils size={18} />
          Meal records
        </div>

        {admin && (
          <>
            <div className="side-item">
              <Users size={18} />
              Customers
            </div>

            <div className="side-item">
              <Wallet size={18} />
              Payments
            </div>
          </>
        )}

        <div className="side-bottom">
          <div className="user-mini">
            <div className="avatar">
              {user.name?.[0]?.toUpperCase()}
            </div>

            <div>
              <b>{user.name}</b>
              <small>
                {admin ? "Hotel Admin" : "Customer"}
              </small>
            </div>
          </div>

          <button className="logout" onClick={logout}>
            <LogOut size={17} />
            Sign out
          </button>
        </div>
      </aside>

      <main className="main">
        <header className="dash-header">
          <div>
            <div className="breadcrumbs">
              Mondal Mess & Hotel / Dashboard
            </div>

            <h1>
              Good{" "}
              {new Date().getHours() < 12
                ? "morning"
                : new Date().getHours() < 17
                ? "afternoon"
                : "evening"}
              , {user.name.split(" ")[0]} 👋
            </h1>

            <p className="muted">
              {admin
                ? "Here’s your hotel’s monthly overview."
                : "Here’s your meal and billing overview."}
            </p>
          </div>

          <div className="header-tools">
            <label className="month-picker">
              <CalendarDays size={17} />

              <input
                type="month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              />
            </label>

            <button
              className="icon-button"
              onClick={refresh}
              title="Refresh"
            >
              <RefreshCw size={18} />
            </button>
          </div>
        </header>

        {message && (
          <div
            className="notice"
            onClick={() => setMessage("")}
          >
            {message}
            <button>×</button>
          </div>
        )}

        {loading ? (
          <div className="loading">
            Loading your dashboard…
          </div>
        ) : (
          <>
            <div className="stat-grid">
              {admin ? (
                <>
                  <Stat
                    label="Registered customers"
                    value={data?.totalUsers || 0}
                    note={`${data?.activeUsers || 0} active`}
                    icon={<Users />}
                  />

                  <Stat
                    label="Meals this month"
                    value={data?.totalMeals || 0}
                    note="Recorded meals"
                    icon={<Utensils />}
                  />

                  <Stat
                    label="Meal billing"
                    value={money(data?.mealRevenue)}
                    note="Current month"
                    icon={<Receipt />}
                  />

                  <Stat
                    label="Payments collected"
                    value={money(data?.collected)}
                    note="Current month"
                    icon={<Wallet />}
                  />
                </>
              ) : (
                <>
                  <Stat
                    label="Meals this month"
                    value={
                      records.filter(
                        (x) => x.status !== "cancelled"
                      ).length
                    }
                    note="Recorded meals"
                    icon={<Utensils />}
                  />

                  <Stat
                    label="Current meal bill"
                    value={money(bill?.currentMonthBill)}
                    note={month}
                    icon={<Receipt />}
                  />

                  <Stat
                    label="Amount paid"
                    value={money(bill?.totalPaid)}
                    note="Payments recorded"
                    icon={<Wallet />}
                  />

                  <Stat
                    label="Balance due"
                    value={money(bill?.remainingBalance)}
                    note={bill?.paymentStatus || "No bill"}
                    icon={<Wallet />}
                  />
                </>
              )}
            </div>

            <div className="content-grid">
              <section className="panel">
                <div className="panel-head">
                  <div>
                    <h2>
                      {admin
                        ? "Record a meal"
                        : "My meal records"}
                    </h2>

                    <p>
                      {admin
                        ? "Add a meal consumed by a customer."
                        : "Meals recorded for the selected month."}
                    </p>
                  </div>
                </div>

                {admin ? (
                  <form
                    className="inline-form"
                    onSubmit={addMeal}
                  >
                    <select
                      required
                      value={mealForm.userId}
                      onChange={(e) =>
                        setMealForm({
                          ...mealForm,
                          userId: e.target.value,
                        })
                      }
                    >
                      <option value="">
                        Select customer
                      </option>

                      {users.map((u) => (
                        <option value={u._id} key={u._id}>
                          {u.name} · {u.mobile}
                        </option>
                      ))}
                    </select>

                    <select
                      required
                      value={mealForm.mealTypeId}
                      onChange={(e) =>
                        setMealForm({
                          ...mealForm,
                          mealTypeId: e.target.value,
                        })
                      }
                    >
                      <option value="">Meal type</option>

                      {types
                        .filter((t) => t.isActive)
                        .map((t) => (
                          <option
                            value={t._id}
                            key={t._id}
                          >
                            {t.name} · {money(t.currentPrice)}
                          </option>
                        ))}
                    </select>

                    <input
                      required
                      type="date"
                      value={mealForm.mealDate}
                      onChange={(e) =>
                        setMealForm({
                          ...mealForm,
                          mealDate: e.target.value,
                        })
                      }
                    />

                    <button className="btn primary">
                      Add meal
                    </button>
                  </form>
                ) : (
                  <form
                    className="inline-form"
                    onSubmit={addMeal}
                  >
                    <select
                      required
                      value={mealForm.mealTypeId}
                      onChange={(e) =>
                        setMealForm({
                          ...mealForm,
                          mealTypeId: e.target.value,
                        })
                      }
                    >
                      <option value="">Choose meal</option>

                      {types
                        .filter((t) => t.isActive)
                        .map((t) => (
                          <option
                            value={t._id}
                            key={t._id}
                          >
                            {t.name} · {money(t.currentPrice)}
                          </option>
                        ))}
                    </select>

                    <input
                      required
                      type="date"
                      value={mealForm.mealDate}
                      onChange={(e) =>
                        setMealForm({
                          ...mealForm,
                          mealDate: e.target.value,
                        })
                      }
                    />

                    <button className="btn primary">
                      Record meal
                    </button>
                  </form>
                )}

                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        {admin && <th>Customer</th>}
                        <th>Meal</th>
                        <th>Date</th>
                        <th>Price</th>
                        <th>Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      {records.slice(0, 12).map((r) => (
                        <tr key={r._id}>
                          {admin && (
                            <td>
                              {users.find(
                                (u) => u._id === r.userId
                              )?.name || "Customer"}
                            </td>
                          )}

                          <td>
                            <b>{r.mealNameSnapshot}</b>
                          </td>

                          <td>
                            {new Date(
                              r.mealDate
                            ).toLocaleDateString("en-IN")}
                          </td>

                          <td>
                            {money(r.mealPriceSnapshot)}
                          </td>

                          <td>
                            <span
                              className={`badge ${r.status}`}
                            >
                              {r.status}
                            </span>
                          </td>
                        </tr>
                      ))}

                      {!records.length && (
                        <tr>
                          <td
                            colSpan={admin ? 5 : 4}
                            className="empty"
                          >
                            No meal records for this month yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="panel">
                <div className="panel-head">
                  <div>
                    <h2>
                      {admin ? "Meal prices" : "Monthly bill"}
                    </h2>

                    <p>
                      {admin
                        ? "Manage current meal prices."
                        : "Your selected billing month."}
                    </p>
                  </div>
                </div>

                {admin ? (
                  <>
                    <form
                      className="price-form"
                      onSubmit={addType}
                    >
                      <input
                        required
                        placeholder="Meal name"
                        value={priceForm.name}
                        onChange={(e) =>
                          setPriceForm({
                            ...priceForm,
                            name: e.target.value,
                          })
                        }
                      />

                      <input
                        required
                        type="number"
                        min="0"
                        step="0.5"
                        placeholder="₹ Price"
                        value={priceForm.currentPrice}
                        onChange={(e) =>
                          setPriceForm({
                            ...priceForm,
                            currentPrice: e.target.value,
                          })
                        }
                      />

                      <button className="btn primary">
                        Add
                      </button>
                    </form>

                    {types.map((t) => (
                      <div className="price-row" key={t._id}>
                        <span>{t.name}</span>
                        <b>{money(t.currentPrice)}</b>

                        <button onClick={() => changePrice(t)}>
                          Edit
                        </button>
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    <div className="bill-total">
                      <span>Total meal cost</span>
                      <strong>
                        {money(bill?.currentMonthBill)}
                      </strong>
                    </div>

                    <div className="bill-line">
                      <span>Total paid</span>
                      <b className="green">
                        {money(bill?.totalPaid)}
                      </b>
                    </div>

                    <div className="bill-line">
                      <span>Balance due</span>
                      <b
                        className={
                          bill?.remainingBalance > 0
                            ? "red"
                            : "green"
                        }
                      >
                        {money(bill?.remainingBalance)}
                      </b>
                    </div>

                    <div className="bill-line">
                      <span>Status</span>
                      <span className="badge">
                        {bill?.paymentStatus}
                      </span>
                    </div>

                    <div className="bill-breakdown">
                      {bill?.mealBreakdown?.map((x) => (
                        <div key={x.mealName}>
                          <span>
                            {x.mealName}{" "}
                            <small>× {x.quantity}</small>
                          </span>

                          <b>{money(x.subtotal)}</b>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </section>
            </div>

            {admin && (
              <div className="content-grid lower">
                <section className="panel">
                  <div className="panel-head">
                    <div>
                      <h2>Record a payment</h2>
                      <p>
                        Record cash, UPI or bank payments received.
                      </p>
                    </div>
                  </div>

                  <form
                    className="payment-form"
                    onSubmit={addPayment}
                  >
                    <select
                      required
                      value={paymentForm.userId}
                      onChange={(e) =>
                        setPaymentForm({
                          ...paymentForm,
                          userId: e.target.value,
                        })
                      }
                    >
                      <option value="">Choose customer</option>

                      {users.map((u) => (
                        <option value={u._id} key={u._id}>
                          {u.name}
                        </option>
                      ))}
                    </select>

                    <input
                      required
                      type="number"
                      min="1"
                      placeholder="Amount ₹"
                      value={paymentForm.amount}
                      onChange={(e) =>
                        setPaymentForm({
                          ...paymentForm,
                          amount: e.target.value,
                        })
                      }
                    />

                    <select
                      value={paymentForm.paymentMethod}
                      onChange={(e) =>
                        setPaymentForm({
                          ...paymentForm,
                          paymentMethod: e.target.value,
                        })
                      }
                    >
                      {[
                        "Cash",
                        "UPI",
                        "Bank Transfer",
                        "Other",
                      ].map((x) => (
                        <option key={x}>{x}</option>
                      ))}
                    </select>

                    <input
                      type="date"
                      value={paymentForm.paymentDate}
                      onChange={(e) =>
                        setPaymentForm({
                          ...paymentForm,
                          paymentDate: e.target.value,
                        })
                      }
                    />

                    <button className="btn primary">
                      Save payment
                    </button>
                  </form>
                </section>

                <section className="panel">
                  <div className="panel-head">
                    <div>
                      <h2>Recent payments</h2>
                      <p>
                        Payments recorded for {month}.
                      </p>
                    </div>
                  </div>

                  {payments.slice(0, 6).map((p) => (
                    <div className="payment-row" key={p._id}>
                      <div className="avatar small-avatar">
                        {p.userId?.name?.[0] || "U"}
                      </div>

                      <div className="payment-person">
                        <b>{p.userId?.name || "Customer"}</b>

                        <small>
                          {p.paymentMethod} ·{" "}
                          {new Date(
                            p.paymentDate
                          ).toLocaleDateString("en-IN")}
                        </small>
                      </div>

                      <strong className="green">
                        {money(p.amount)}
                      </strong>
                    </div>
                  ))}

                  {!payments.length && (
                    <p className="empty">
                      No payments recorded for this month.
                    </p>
                  )}
                </section>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

function Stat({ label, value, note, icon }) {
  return (
    <div className="stat-card">
      <div className="stat-top">
        <span>{label}</span>
        <span className="stat-icon">{icon}</span>
      </div>

      <strong>{value}</strong>
      <small>{note}</small>
    </div>
  );
}

export default App;